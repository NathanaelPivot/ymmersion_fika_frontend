import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  imageLoaded: boolean = false;
  productsType: Product[] = [];

  categorie: string = "";
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categorie = params['type']; 
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this.productService.getProduitByCategorie(this.categorie).subscribe(response => {
      this.productsType = response;
      console.log(this.productsType);
    });
  }
}
