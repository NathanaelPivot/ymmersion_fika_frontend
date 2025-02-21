import {Component, OnInit} from '@angular/core';
import {SideCartService} from '../../services/side-cart.service';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;

  constructor(
    private sideCartService: SideCartService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin(); // Vérifie immédiatement si l'utilisateur est admin
    console.log('Est-ce que l\'utilisateur est admin ? ', this.isAdmin);
  }


  openSideCart() {
    this.sideCartService.openSideCart();
  }


}
