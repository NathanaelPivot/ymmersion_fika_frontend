import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss']
})
export class PopupDeleteComponent {
  @Input() selectedProductId: number | null = null; // Produit à afficher
  @Input() showPopup: boolean = false; // Contrôle la visibilité du pop-up

  @Output() confirm = new EventEmitter<number>();// Événement pour confirmer la suppression
  @Output() cancel = new EventEmitter<void>();  // Événement pour annuler la suppression

  confirmDeletion() {
    if (this.selectedProductId !== null) {
      this.confirm.emit(this.selectedProductId); // Émet l'ID du produit à supprimer
    }
  }

  cancelDeletion() {
    this.cancel.emit(); // Notifie le parent pour annuler
  }
}
