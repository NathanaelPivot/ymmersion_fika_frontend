import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product.model'; // Import du modèle

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  products: Product[] = []; // Utilisation du modèle Product

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Récupération des produits via le service
    this.productService.getProduits().subscribe((data: Product[]) => {
      this.products = data; // Typé comme un tableau de Product
    });
  }

  editProduct(product: Product) {
    console.log('Modifier le produit :', product);
    // Implémentez ici la logique de modification
  }

  deleteProduct(productId: number) {
    console.log('Supprimer le produit ID :', productId);
    // Implémentez votre logique de suppression avec ProductService
  }
}
