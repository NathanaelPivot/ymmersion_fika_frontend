import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // ✅ Import de AppRoutingModule
import { SharedModule } from './shared/shared.module';
import { IngredientManagementComponent } from './admin/ingredient-management/ingredient-management.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
