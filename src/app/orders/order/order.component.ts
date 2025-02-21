import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../../core/services/stripe/stripe.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../core/models/order.model';
import { OrderServiceService } from '../../core/services/order/order-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  order: Product[] = [];
  confirmModal: boolean = false;
  total: number = 0;


  finalOrder: {
    totalPrice: number,
    orderItems: Product[]
  } = { totalPrice: 0, orderItems: [] }

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  // Ajout des propriétés manquantes
  cardholderName: string = '';
  email: string = '';
  billingCountry: string = 'FR';
  postalCode: string = '';

  succedPayement: boolean = false;

  @ViewChild('cardElement', { static: false }) cardElement: ElementRef | undefined;

  constructor(private stripeService: StripeService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router,
    private orderService: OrderServiceService) { }

  async ngOnInit() {
    this.getOrder();
    this.getTotal();
    this.stripe = await this.stripeService.getStripe();
  }

  async ngAfterViewInit() {
    if (!this.stripe) {
      this.stripe = await this.stripeService.getStripe();
    }
    this.mountFunction();
  }


  getOrder() {
    if (this.isLocalStorageAvailable()) {
      this.order = JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  getTotal() {
    this.total = this.order.reduce((acc, produit: Product) => {
      const prixFinal = produit.promotion
        ? produit.price * (1 - produit.promotion / 100)
        : produit.price;
      return acc + prixFinal * produit.quantity;
    }, 0);
  }

  async mountFunction() {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Attendre que la modal soit bien affichée

    if (!this.stripe || !this.cardElement) {
      console.error('Stripe ou l\'élément de carte Stripe n\'est pas prêt.');
      return;
    }

    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');

    if (this.cardElement.nativeElement) {
      this.card.mount(this.cardElement.nativeElement);
      this.cdr.detectChanges(); // Forcer Angular à détecter les changements
      console.log('Carte Stripe montée avec succès.');
    } else {
      console.error('L\'élément #card-element n\'a pas été trouvé.');
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.card) return;

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name: this.cardholderName,
        email: this.email,
        address: {
          country: this.billingCountry,
          postal_code: this.postalCode
        }
      }
    });

    if (error) {
      console.error('Erreur de paiement Stripe:', error);
      return;
    }

    console.log('PaymentMethod créé:', paymentMethod);

    // Envoyer au backend pour créer un PaymentIntent
    this.http.post('http://localhost:3000/subscriptions/pay', {
      paymentMethodId: paymentMethod.id,
      amount: this.total * 100,
      currency: 'eur',
      email: this.email
    }).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur:', response);
        if (response.requiresAction) {
          this.handle3DSecure(response.clientSecret);
        } else {
          console.log('Paiement réussi 🎉');
          this.succedPayement = true;

          this.finalOrder.totalPrice = this.total;
          this.finalOrder.orderItems = this.order;

          this.orderService.createOrder(this.finalOrder)

          this.router.navigateByUrl(`/succeed/${this.succedPayement}`);
        }
      },
      error: (err) => {
        console.error('Erreur lors du paiement:', err);
        this.succedPayement = false;
        this.router.navigateByUrl(`/succeed/${this.succedPayement}`);
      },
    });

  }

  async handle3DSecure(clientSecret: string) {
    if (!this.stripe) return;

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret);

    if (error) {
      console.error('Échec du paiement 3D Secure:', error);

    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Paiement validé avec 3D Secure 🎉');
    }
  }


  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  toggleModal() {
    this.confirmModal = true;
    setTimeout(() => {
      if (this.cardElement && this.cardElement.nativeElement) {
        this.mountFunction();
      }
    }, 300); // Augmenter légèrement le délai pour garantir que le DOM est mis à jour
  }

}
