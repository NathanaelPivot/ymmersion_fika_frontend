import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredientService } from '../../../../core/services/ingredient/ingredient.service';

@Component({
  selector: 'app-popup-create',
  templateUrl: './popup-create.component.html',
  styleUrls: ['./popup-create.component.scss'],
})
export class PopupCreateComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  // Objet pour le nouveau produit
  newProduct = {
    name: '',
    description: '',
    price: 0,
    promotion: 0,
    type: '',
    category: '',
    available: false,
    ingredients: [] as string[],
    imagePath: '' // Image en base64
  };

  // Liste des options (types et catégories)
  typeOptions = ['Type A', 'Type B', 'Type C'];
  categoryOptions = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];

  // Liste des ingrédients disponibles
  ingredients: string[] = [];
  selectedIngredient: string = ''; // Ingrédient actuellement sélectionné dans le formulaire

  // Prévisualisation de l'image
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe((data) => {
      this.ingredients = data.map((ingredient: any) => ingredient.name);
    });
  }

  // Méthode pour gérer le changement de fichier
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Met à jour l'aperçu
        this.newProduct.imagePath = reader.result as string; // Stocke l'image sous forme base64
      };
      reader.readAsDataURL(file); // Lit le fichier comme Data URL
    }
  }

  // Ajouter un ingrédient
  addSelectedIngredient(): void {
    if (this.selectedIngredient && !this.newProduct.ingredients.includes(this.selectedIngredient)) {
      this.newProduct.ingredients.push(this.selectedIngredient);
    }
  }

  // Supprimer un ingrédient
  removeIngredient(index: number): void {
    this.newProduct.ingredients.splice(index, 1);
  }

  // Fermer la popup
  closePopup(): void {
    this.closed.emit();
  }

  // Envoyer le produit créé
  createProduct(): void {
    this.create.emit(this.newProduct);
    this.closePopup();
  }
}
