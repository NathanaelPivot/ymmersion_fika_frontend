import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../../core/services/stripe/stripe.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  order: Product[] = []

  confirmModal: boolean = false;

  total: number = 0

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  constructor(private stripeService: StripeService) { }


  async ngOnInit() {
    this.getOrder()
    this.getTotal()
    this.stripe = await this.stripeService.getStripe();
  }

  // async ngAfterViewInit() {
  //   await this.mountFunction();
  // }


  getOrder() {
    if (this.isLocalStorageAvailable()) {
      this.order = JSON.parse(localStorage.getItem('cart') || '[]');
    }

    return
  }

  getTotal() {
    this.total = this.order.reduce((acc, produit: Product) => {
      const prixFinal = produit.promotion
        ? produit.price * (1 - produit.promotion / 100)
        : produit.price;
      return acc + (prixFinal * produit.quantity);
    }, 0);
  }

  async mountFunction() {
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      const cardElement = document.getElementById('card-element');
      if (cardElement) {
        this.card.mount(cardElement); // Monter l'élément card sur l'élément DOM
      } else {
        console.error('L\'élément #card-element n\'a pas été trouvé.');
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
