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
  selectedProduct: Product | null = null;
  showDeletePopup: boolean = false; // Contrôle la visibilité du pop-up de suppression
  showUpdatePopup: boolean = false; // Contrôle la visibilité du pop-up de mise à jour

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
    this.selectedProductId = product.id; // Stocke l'ID du produit sélectionné
    this.selectedProduct = product; // Stocke les détails du produit à modifier
    this.showUpdatePopup = true; // Affiche le pop-up de mise à jour
  }

  onUpdateProduct(updatedProduct: Product) {
    if (!updatedProduct || !updatedProduct.id) return;

    console.log(updatedProduct);

    this.productService.updateProduit(updatedProduct).subscribe({
      next: (response) => {
        console.log("Produit mis à jour :", response);
        // Met à jour la liste locale
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.showPopup = false; // Ferme le pop-up
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
      }
    });
  }

  deleteProductPopUP(productId: number) {
    this.selectedProductId = productId;
    this.showDeletePopup = true; // Affiche le pop-up de suppression
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

  cancelPopUP(): void {
    this.showDeletePopup = false; // Ferme le pop-up de suppression
    this.showUpdatePopup = false; // Ferme le pop-up de mise à jour
    this.selectedProductId = null;
    this.selectedProduct = null;
  }
}
