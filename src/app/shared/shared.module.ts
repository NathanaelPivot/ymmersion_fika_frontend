import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component'; // Assurez-vous du chemin
import { SideCartComponent } from './components/side-cart/side-cart.component'; // Assurez-vous du chemin

import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [
    HeaderComponent, // Déclaré ici
    SideCartComponent // Déclaré ici
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  exports: [
    HeaderComponent, // Exporté ici
    SideCartComponent // Exporté ici
  ]
})
export class SharedModule { }
