import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';  // ✅ Import de AppRoutingModule
import {SharedModule} from './shared/shared.module';
import {IngredientManagementComponent} from './admin/ingredient-management/ingredient-management.component';
import {LucideAngularModule, ShoppingCart, User, X} from 'lucide-angular';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    LucideAngularModule.pick({
      ShoppingCart,
      User,
      X
    }),
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
