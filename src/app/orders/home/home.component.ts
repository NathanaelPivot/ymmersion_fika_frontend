import {Component, OnInit} from '@angular/core';
import {Product} from '../../core/models/product.model';
import {ProductService} from '../../core/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) {

  }

  products!: {
    platsDuJour$: Product[],
    promos$: Product[]
  }

  ngOnInit(): void {
    this.fetchPlatDuJour();
  }

  fetchPlatDuJour() {
    this.productService.getPlatDuJour().subscribe(response => {
      this.products.platsDuJour$ = response;
      console.log(this.products.platsDuJour$);
    })
  }
}
