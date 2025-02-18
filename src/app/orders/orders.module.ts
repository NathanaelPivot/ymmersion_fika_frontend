import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module'; 
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule  
  ]
})
export class OrdersModule { }
