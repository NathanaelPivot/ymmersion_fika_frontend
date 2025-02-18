import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< Updated upstream
import { AuthRoutingModule } from './admin.routing.module';
=======
import {AuthRoutingModule} from './auth.routing.module';
>>>>>>> Stashed changes



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
