import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInProgressComponent } from './order-in-progress/order-in-progress.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { IngredientManagementComponent } from './ingredient-management/ingredient-management.component';
import { HistoryComponent } from './history/history.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AdminRoutingModule } from './admin.routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataGridComponent } from './product-management/components/data-grid/data-grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {SharedModule} from '../shared/shared.module';
import { PopupDeleteComponent } from './product-management/components/data-grid/components/popup-delete/popup-delete.component';
import { PopupUpdateComponent } from './product-management/components/data-grid/components/popup-update/popup-update.component';

@NgModule({
  declarations: [
    OrderInProgressComponent,
    ProductManagementComponent,
    IngredientManagementComponent,
    HistoryComponent,
    CreateProductComponent,
    UpdateProductComponent,
    NavbarComponent,
    DataGridComponent,
    PopupDeleteComponent,
    PopupUpdateComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LucideAngularModule,
    SharedModule
  ]
})
export class AdminModule { }
