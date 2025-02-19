import { Component } from '@angular/core';
import { SideCartService } from '../../services/side-cart.service'; // ✅ Import du service

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent {
  isOpen: boolean = false; // État local du Side Cart

  constructor(private sideCartService: SideCartService) {
    // Écoutez les changements de l'état du Side Cart
    this.sideCartService.sideCartOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeSideCart() {
    this.sideCartService.closeSideCart(); // Fermez le Side Cart
  }
}
