import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { Page404Component } from './page-404/page-404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plats', component: ProductsComponent },
  { path: 'boissons', component: ProductsComponent },
  { path: 'dessert', component: ProductsComponent },
  { path: 'snacks', component: ProductsComponent },
  { path: 'detail/:id', component: DetailProduitComponent },
  { path: '404', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
