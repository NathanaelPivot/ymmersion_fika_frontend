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
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SucceedPayementComponent } from './succeed-payement/succeed-payement.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, DetailProduitComponent, Page404Component, OrderComponent, DecimalFormatPipe, SucceedPayementComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [StripeService]
})
export class OrdersModule { }
