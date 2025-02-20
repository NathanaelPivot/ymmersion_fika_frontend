import { Component } from '@angular/core';
import { SideCartService } from '../../services/side-cart.service'; // ✅ Import du service
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent {
  isOpen: boolean = false; // État local du Side Cart

  cart: Product[] = [];

  constructor(private sideCartService: SideCartService,
    private cartService: CartService

  ) {
    this.sideCartService.sideCartOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;

    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = [...cart];
    });
  }

  closeSideCart() {
    this.sideCartService.closeSideCart();
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product);
  }
}
