import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';  // ✅ Import de AppRoutingModule
import {SharedModule} from './shared/shared.module';
import {IngredientManagementComponent} from './admin/ingredient-management/ingredient-management.component';
import {LucideAngularModule, MoveDown, MoveUp, ShoppingCart, User, X} from 'lucide-angular';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AdminModule} from './admin/admin.module';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PromotionPipe } from './core/pipes/promotion/promotion.pipe';

registerLocaleData(localeFr, 'fr');

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
      X,
      MoveDown,
      MoveUp,
    }),
    AdminModule,
  ],
  providers: [
    CookieService,
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
