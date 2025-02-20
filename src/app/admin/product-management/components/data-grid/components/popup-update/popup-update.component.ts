import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Product } from '../../../../../../core/models/product.model';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-popup-update',
  templateUrl: './popup-update.component.html',
  styleUrls: ['./popup-update.component.scss']
})
export class PopupUpdateComponent implements OnChanges {
  @Input() selectedProductId: number | null = null; // ID du produit à modifier
  @Input() showPopup: boolean = false; // Contrôle la visibilité du pop-up
  @Input() productData: Product | null = null; // Données du produit sélectionné

  @Output() confirm = new EventEmitter<Product>(); // Envoie les données mises à jour
  @Output() cancel = new EventEmitter<void>(); // Fermeture sans modification

  public readonly url: string = environment.apiUrl + '/uploads/';

  updatedProduct: Product | null = null; // Objet pour les modifications

  typeOptions: string[] = ['Plats', 'Desserts', 'Snack'];

  // Liste des catégories disponibles (modifiable selon les besoins)
  categoryOptions: string[] = ['Premium', 'Basique', 'Luxueux', 'Discount'];


  ngOnChanges(): void {
    // Crée une copie indépendante du produit sélectionné pour éviter des modifications directes
    if (this.productData) {
      this.updatedProduct = { ...this.productData };
    }
  }

  /**
   * Gère le changement d'image et l'affiche dans la preview.
   */
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      // Lecture du fichier en base64, prêt pour la preview
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result && this.updatedProduct) {
          this.updatedProduct.imagePath = e.target.result as string; // Met à jour l'imagePath avec la preview
        }
      };

      reader.readAsDataURL(file); // Conversion en base64
    }
  }

  /**
   * Envoie le produit mis à jour lorsqu'on confirme.
   */
  onConfirm(): void {
    if (this.updatedProduct) {
      this.confirm.emit(this.updatedProduct); // Envoie l'objet mis à jour
    }
  }

  /**
   * Annule les modifications et ferme le pop-up.
   */
  onCancel(): void {
    this.cancel.emit(); // Émet l'événement d'annulation
  }
}
