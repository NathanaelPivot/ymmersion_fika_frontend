import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product/product.service';
import { Router } from '@angular/router';
import { Ingredient } from '../../core/models/ingredient.model';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.scss'
})
export class DetailProduitComponent {
  paramValue: string | null = null;

  errMessage: string | null = null;

  produit!: Product;

  produitOrder!: Product;

  ingredientList: Ingredient[] = [];
  withoutList: Ingredient[] = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramValue = this.route.snapshot.paramMap.get('id');
    console.log(this.paramValue)
    if (this.paramValue !== null) {
      this.getProduit(parseInt(this.paramValue, 10))
    } else {
      this.router.navigateByUrl('/404');
    }
  }

  getProduit(id: number) {
    this.productService.getProduit(id).subscribe(response => {
      this.produit = response;
      this.ingredientList = this.produit.ingredients;
    })
  }

  removeIngredient(ingredient: Ingredient) {
    if (this.ingredientList.length <= 1) {
      this.errMessage = `On va quand même pas vous faire un ${this.produit.name} sans rien ?`
    }
    this.ingredientList = this.ingredientList.filter(item => item !== ingredient);
    this.withoutList.push(ingredient)
  }

  addIngredient(ingredient: Ingredient) {
    this.withoutList = this.withoutList.filter(item => item !== ingredient);
    this.ingredientList.push(ingredient)
    this.errMessage = null;
  }
}
