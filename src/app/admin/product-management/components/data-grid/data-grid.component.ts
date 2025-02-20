import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product.model';
import {environment} from '../../../../../environments/environment'; // Import du modèle

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  products: Product[] = []; // Produits récupérés
  isAscending: boolean = true; // Définit l'ordre de tri par défaut
  currentSortProperty: string = ''; // Garde la trace de la colonne triée
  selectedProductId: number | null = null; // ID du produit sélectionné pour suppression
  showPopup: boolean = false; // Contrôle la visibilité du popup

  public readonly url: string = environment.apiUrl + '/uploads/';

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

  deleteProductPopUP(productId: number) {
    this.selectedProductId = productId;
    this.showPopup = true;
  }

  confirmDeletion(id: number): void {
    if (!id) return; // Vérification de l'ID avant suppression
    this.productService.deleteProduit(id).subscribe({
      next: () => {
        console.log(`Produit avec ID ${id} supprimé avec succès.`);
        this.products = this.products.filter(product => product.id !== id); // Supprime localement
        this.showPopup = false;
        this.selectedProductId = null;
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du produit :', err);
        this.showPopup = false;
      }
    });
  }

  cancelDeletion(): void {
    console.log('Annulation de la suppression.');
    this.showPopup = false;
    this.selectedProductId = null;
  }
}
