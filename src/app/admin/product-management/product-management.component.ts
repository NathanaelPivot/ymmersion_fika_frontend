import { Component } from '@angular/core';
import {ProductService} from '../../core/services/product/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent {
  showCreatePopup: boolean = false;

  constructor(
    private productService: ProductService,
  ) {
  }

  createProductPopUP(): void {
    this.showCreatePopup = true;
  }

  cancelPopUP(): void {
    this.showCreatePopup = false;
  }

  // Ajoutez un paramètre ici pour recevoir le produit
  onCreateProduct(newProduct: any): void {
    this.productService.createProduit(newProduct)
    this.showCreatePopup = false;
  }
}
