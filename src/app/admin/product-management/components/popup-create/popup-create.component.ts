import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredientService } from '../../../../core/services/ingredient/ingredient.service';
import {ProductService} from '../../../../core/services/product/product.service';

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
    ingredientsProduits: [] as { idIngredient: number; quantity: number; name: string }[], // Liste d'objets { idIngredient, quantity, name }
    imagePath: ''
  };

  // Liste des options (types et catégories)
  typeOptions = ['Desserts', 'Plats', 'Boissons', 'Snacks'];
  categoryOptions = ['Plats Chauds Y-novants', 'Les salades Y-novante', 'Y-Snacks', 'Y-Dessert'];

  // Liste des ingrédients disponibles
  ingredients: { id: number; name: string }[] = [];
  selectedIngredientId: number | null = null; // ID de l'ingrédient sélectionné
  selectedIngredientQuantity: number | null = null; // Quantité associée à cet ingrédient
  imageFileName: string | null = null;
  selectedImageFile: File | null = null;

  // Prévisualisation de l'image
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private ingredientService: IngredientService,
              private produitService: ProductService) {}

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.ingredients = data.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
      }));
      console.log('Ingrédients chargés :', this.ingredients);
    }, (error) => {
      console.error('Erreur lors du chargement des ingrédients :', error);
    });
  }

  getIngredientNameById(id: number | null): string | null {
    if (id === null) return null; // Gérer le cas null explicitement

    const ingredient = this.ingredients.find((ing) => ing.id === id);
    return ingredient ? ingredient.name : 'Ingrédient inconnu';
  }

  // Méthode pour gérer le changement de fichier
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedImageFile = file; // Stocker l'objet du fichier
      const fileExtension = file.name.split('.').pop(); // Récupère l'extension
      const newFileName = `produit_${Date.now()}.${fileExtension}`; // Exemple produit_168992343.jpeg

      // Stocker le nom de fichier généré dans l'objet produit
      this.newProduct.imagePath = newFileName;
      console.log('Nom de fichier :', this.newProduct.imagePath);
      console.log('Fichier sélectionné :', this.selectedImageFile);
    }
  }


  // Ajouter un ingrédient
  addSelectedIngredient(): void {
    if (this.selectedIngredientId === null) {
      console.warn('Aucun ingrédient sélectionné.');
      return;
    }

    console.log('ID sélectionné :', this.selectedIngredientId, 'Type :', typeof this.selectedIngredientId);

    // Trouver l'ingrédient dans la liste locale - Convertir l'ID en nombre si nécessaire
    const ingredient = this.ingredients.find(
      (ing) => ing.id === Number(this.selectedIngredientId)
    );

    if (!ingredient) {
      console.warn(`Aucun ingrédient trouvé pour l'ID : ${this.selectedIngredientId}`);
      console.log('Liste actuelle des ingrédients :', this.ingredients);
      return;
    }

    // Vérifier les doublons
    if (this.newProduct.ingredientsProduits.some(
      (ing) => ing.idIngredient === this.selectedIngredientId
    )) {
      console.warn('Cet ingrédient est déjà ajouté.');
      return;
    }

    // Ajouter l'ingrédient au produit
    this.newProduct.ingredientsProduits.push({
      idIngredient: this.selectedIngredientId,
      quantity: this.selectedIngredientQuantity ?? 1, // Valeur par défaut pour la quantité
      name: ingredient.name,
    });

    console.log('Ingrédient ajouté :', {
      idIngredient: this.selectedIngredientId,
      quantity: this.selectedIngredientQuantity,
      name: ingredient.name,
    });

    // Réinitialisation des champs
    this.selectedIngredientId = null;
    this.selectedIngredientQuantity = null;
  }

  // Supprimer un ingrédient
  removeIngredient(index: number): void {
    this.newProduct.ingredientsProduits.splice(index, 1);
  }

  // Fermer la popup
  closePopup(): void {
    this.closed.emit();
  }

  // Envoyer le produit créé
  onCreate(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      console.warn('Le formulaire est invalide.');
      return;
    }

    if (!this.selectedImageFile) {
      console.warn('Aucune image n’a été sélectionnée.');
      return;
    }

    // Préparer FormData
    const formData = new FormData();

    // Ajouter l'objet produit au FormData (converti en JSON)
    formData.append(
      'product',
      new Blob([JSON.stringify({
        ...this.newProduct,
        ingredientsProduits: this.newProduct.ingredientsProduits.map((ingredient) => ({
          idIngredient: ingredient.idIngredient,
          quantity: ingredient.quantity,
        })),
      })], { type: 'application/json' }) // Transformer en JSON Blob
    );

    console.log(formData);
    // Ajouter le fichier image
    formData.append('file', this.selectedImageFile, this.newProduct.imagePath);

    // Vérifier que le FormData est bien préparé
    console.log('Vérification du contenu de FormData (avant envoi ou événement) :');
    console.log(formData);

    // Émettre les données via l'événement
    this.create.emit(formData);
    console.log('FormData émis au composant parent');
  }
}
