import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component'; // Assurez-vous du chemin
import { SideCartComponent } from './components/side-cart/side-cart.component'; // Assurez-vous du chemin

import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {PromotionPipe} from '../core/pipes/promotion/promotion.pipe';

@NgModule({
  declarations: [
    HeaderComponent, // Déclaré ici
    SideCartComponent, // Déclaré ici
    PromotionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  exports: [
    HeaderComponent, // Exporté ici
    SideCartComponent, // Exporté ici
    PromotionPipe
  ]
})
export class SharedModule { }
