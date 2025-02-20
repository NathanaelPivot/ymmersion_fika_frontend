import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    // Remplacez par votre propre clé publique Stripe
    this.stripePromise = loadStripe('pk_test_51QtR62Lz6QQ8kEFH0KMIyidYPD6xGIfIgEMde2uksEz3br4YwCkuV31cFxO43MD0WYCDh6NL9zO6JITCKHdClluK00tHccuDpO');
  }

  // Méthode pour récupérer l'instance Stripe
  getStripe() {
    return this.stripePromise;
  }
}