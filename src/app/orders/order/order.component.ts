import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../../core/services/stripe/stripe.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  order: Product[] = [];
  confirmModal: boolean = false;
  total: number = 0;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  // Ajout des propriétés manquantes
  cardholderName: string = '';
  email: string = '';
  billingCountry: string = 'FR';
  postalCode: string = '';

  @ViewChild('cardElement', { static: false }) cardElement: ElementRef | undefined;

  constructor(private stripeService: StripeService, private cdr: ChangeDetectorRef) { }

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
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Envoyer paymentMethod.id à votre backend pour créer un PaymentIntent
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
