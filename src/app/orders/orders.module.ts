import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { Page404Component } from './page-404/page-404.component';
import { OrderComponent } from './order/order.component';
import { DecimalFormatPipe } from '../core/pipes/decimal/decimal.pipe';
import { StripeService } from '../core/services/stripe/stripe.service'; // Importation du StripeService

@NgModule({
  declarations: [HomeComponent, ProductsComponent, DetailProduitComponent, Page404Component, OrderComponent, DecimalFormatPipe],
  imports: [
    CommonModule,
    OrdersRoutingModule,
  ],
  providers: [StripeService]
})
export class OrdersModule { }
