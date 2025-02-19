import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) {

  }

  products: {
    platsDuJour$: Product[],
    promos$: Product[]
  } = { platsDuJour$: [], promos$: [] };

  ngOnInit(): void {
    this.fetchPlatDuJour();
    this.fetchPromo();
    this.products.platsDuJour$ = [
      {
        id: 1,
        name: "Bœuf Bourguignon",
        description: "Un délicieux ragoût de bœuf mijoté au vin rouge avec des carottes et des oignons.",
        imagePath: "assets/images/boeuf-bourguignon.jpg",
        price: 15.99,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:00:00Z",
        updatedAt: "2025-02-18T10:00:00Z",
        available: true,
        category: "Viande"
      },
      {
        id: 2,
        name: "Poulet Basquaise",
        description: "Poulet mijoté avec des poivrons, des tomates et des oignons.",
        imagePath: "assets/images/poulet-basquaise.jpg",
        price: 13.99,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:05:00Z",
        updatedAt: "2025-02-18T10:05:00Z",
        available: true,
        category: "Volaille"
      },
      {
        id: 3,
        name: "Risotto aux Champignons",
        description: "Un risotto crémeux aux champignons et au parmesan.",
        imagePath: "assets/images/risotto-champignons.jpg",
        price: 12.50,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:10:00Z",
        updatedAt: "2025-02-18T10:10:00Z",
        available: true,
        category: "Végétarien"
      },
      {
        id: 4,
        name: "Saumon Grillé",
        description: "Filet de saumon grillé accompagné d’une sauce citronnée et d’une poêlée de légumes.",
        imagePath: "assets/images/saumon-grille.jpg",
        price: 16.50,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:15:00Z",
        updatedAt: "2025-02-18T10:15:00Z",
        available: true,
        category: "Poisson"
      },
      {
        id: 5,
        name: "Lasagnes Maison",
        description: "Lasagnes à la bolognaise gratinées avec du fromage fondant.",
        imagePath: "assets/images/lasagnes.jpg",
        price: 14.99,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:20:00Z",
        updatedAt: "2025-02-18T10:20:00Z",
        available: true,
        category: "Pâtes"
      },
      {
        id: 6,
        name: "Curry de Légumes",
        description: "Mélange de légumes mijotés dans une sauce au curry et lait de coco.",
        imagePath: "assets/images/curry-legumes.jpg",
        price: 11.50,
        isPlatDuJour: true,
        promotion: 0,
        createdAt: "2025-02-18T10:25:00Z",
        updatedAt: "2025-02-18T10:25:00Z",
        available: true,
        category: "Végétarien"
      }
    ];
    this.products.promos$ = [
      {
        id: 7,
        name: "Entrecôte Grillée",
        description: "Une belle entrecôte grillée servie avec une sauce au poivre et des frites maison.",
        imagePath: "assets/images/entrecote-grillee.jpg",
        price: 22.99,
        isPlatDuJour: false,
        promotion: 20,
        createdAt: "2025-02-18T10:30:00Z",
        updatedAt: "2025-02-18T10:30:00Z",
        available: true,
        category: "Viande"
      },
      {
        id: 8,
        name: "Tagliatelles au Saumon",
        description: "Pâtes fraîches accompagnées d'une sauce crémeuse au saumon fumé.",
        imagePath: "assets/images/tagliatelles-saumon.jpg",
        price: 13.99,
        isPlatDuJour: false,
        promotion: 15,
        createdAt: "2025-02-18T10:35:00Z",
        updatedAt: "2025-02-18T10:35:00Z",
        available: true,
        category: "Pâtes"
      },
      {
        id: 9,
        name: "Pizza Margherita",
        description: "Pizza classique à la tomate, mozzarella et basilic frais.",
        imagePath: "assets/images/pizza-margherita.jpg",
        price: 9.99,
        isPlatDuJour: false,
        promotion: 10,
        createdAt: "2025-02-18T10:40:00Z",
        updatedAt: "2025-02-18T10:40:00Z",
        available: true,
        category: "Pizza"
      },
      {
        id: 10,
        name: "Magret de Canard",
        description: "Magret de canard servi avec une sauce au miel et des pommes sautées.",
        imagePath: "assets/images/magret-canard.jpg",
        price: 18.50,
        isPlatDuJour: false,
        promotion: 25,
        createdAt: "2025-02-18T10:45:00Z",
        updatedAt: "2025-02-18T10:45:00Z",
        available: true,
        category: "Viande"
      },
      {
        id: 11,
        name: "Tartare de Bœuf",
        description: "Tartare de bœuf assaisonné, servi avec des frites et une salade verte.",
        imagePath: "assets/images/tartare-boeuf.jpg",
        price: 16.99,
        isPlatDuJour: false,
        promotion: 5,
        createdAt: "2025-02-18T10:50:00Z",
        updatedAt: "2025-02-18T10:50:00Z",
        available: true,
        category: "Viande"
      },
      {
        id: 12,
        name: "Salade César",
        description: "Salade romaine, poulet grillé, parmesan, croûtons et sauce César maison.",
        imagePath: "assets/images/salade-cesar.jpg",
        price: 12.50,
        isPlatDuJour: false,
        promotion: 10,
        createdAt: "2025-02-18T10:55:00Z",
        updatedAt: "2025-02-18T10:55:00Z",
        available: true,
        category: "Salade"
      }
    ];
  }

  fetchPlatDuJour() {
    this.productService.getPlatDuJour().subscribe(response => {
      this.products.platsDuJour$ = response;
    })
  }

  fetchPromo() {
    this.productService.getPromo().subscribe(response => {
      this.products.promos$ = response;
    })
  }
}
