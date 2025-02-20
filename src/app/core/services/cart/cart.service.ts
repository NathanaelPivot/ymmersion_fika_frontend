import { Product } from './../../models/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {
    this.loadCart(); // Charger le panier au démarrage
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private loadCart() {
    if (this.isLocalStorageAvailable()) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cart.next(cart); // Mettre à jour le BehaviorSubject
      console.log('Cart loaded from localStorage:', cart); // Debug
    }
  }

  private saveCart(cart: Product[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cart.next([...cart]); // ❗ Nouvelle référence pour déclencher la détection de changement
      console.log('Cart updated:', cart); // Debug
    }
  }


  addToCart(product: Product) {
    let cart = [...this.cart.value]; // ❗ Créer une nouvelle référence
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.saveCart(cart);
    this.loadCart();
  }


  decreaseQuantity(product: Product) {
    let cart = this.cart.value.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0); // ❗ Supprime les articles avec quantité = 0

    this.saveCart([...cart]); // ❗ Nouvelle référence
  }


  removeFromCart(index: number) {
    let cart = [...this.cart.value]; // ❗ Nouvelle référence
    cart.splice(index, 1);
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
  }
}
