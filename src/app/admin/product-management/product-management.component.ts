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
  onCreateProduct(formData: FormData): void {
    console.log('FormData reçu depuis le composant enfant :');

    // Vérifiez les champs du FormData
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Si rien n'apparaît, logguez aussi formData brut
    console.log('FormData brut :', formData);

    // Astuce : si besoin, remplacez formData.forEach par un polyfill pour un affichage dans certains navigateurs
  }
}
