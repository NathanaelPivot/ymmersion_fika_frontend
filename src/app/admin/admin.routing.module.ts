import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientManagementComponent } from './ingredient-management/ingredient-management.component';
import { OrderInProgressComponent } from './order-in-progress/order-in-progress.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { HistoryComponent } from './history/history.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
    { path: 'in-progress', component: OrderInProgressComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'product-management', component: ProductManagementComponent },
    { path: 'ingredient-management', component: IngredientManagementComponent },
    { path: 'create-product', component: CreateProductComponent },
    { path: 'update-product', component: UpdateProductComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
