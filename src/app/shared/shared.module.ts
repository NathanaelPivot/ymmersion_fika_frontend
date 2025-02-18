import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '@angular/router';
import {LucideAngularModule} from "lucide-angular";

@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LucideAngularModule
    ],
  exports: [HeaderComponent]
})
export class SharedModule { }
