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
  isAscending: boolean = true; // Définit l'ordre de tri par défaut
  currentSortProperty: string = ''; // Garde la trace de la colonne triée

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Récupération des produits via le service
    this.productService.getProduits().subscribe((data: Product[]) => {
      this.products = data; // Typé comme un tableau de Product
    });
  }

  sortTable(property: string) {
    if (this.currentSortProperty === property) {
      // Inverse l'ordre si on clique sur la même colonne
      this.isAscending = !this.isAscending;
    } else {
      // Définit un tri ascendant si on clique sur une colonne différente
      this.isAscending = true;
      this.currentSortProperty = property;
    }

    this.products.sort((a: any, b: any) => {
      // Remplace les valeurs null ou undefined par 0 pour le tri
      const valueA = a[property] != null ? a[property] : 0; // `null` ou `undefined` devient 0
      const valueB = b[property] != null ? b[property] : 0; // `null` ou `undefined` devient 0

      // Tri ascendant
      if (this.isAscending) {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      }

      // Tri descendant
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
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
