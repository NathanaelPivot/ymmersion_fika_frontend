import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private stripeService: StripeService) { }

  async ngOnInit() {
    this.getOrder();
    this.getTotal();
    this.stripe = await this.stripeService.getStripe();
  }

  ngAfterViewInit() {
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
    if (this.stripe && this.cardElement) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      const cardElement = this.cardElement.nativeElement;
      this.card.mount(cardElement);

      // Élément IBAN pour SEPA
      const iban = this.elements.create('iban', {
        supportedCountries: ['SEPA'],
      });
      const ibanElement = document.getElementById('iban-element');
      if (ibanElement) {
        iban.mount(ibanElement);
      } else {
        console.error('L\'élément #iban-element n\'a pas été trouvé.');
      }
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
      this.mountFunction(); // Attendre que le DOM soit mis à jour
    }, 0);
  }
}
