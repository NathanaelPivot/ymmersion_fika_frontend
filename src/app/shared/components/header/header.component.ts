import { Component } from '@angular/core';
import {SideCartService} from '../../services/side-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sideCartService: SideCartService) { }

  openSideCart() {
    this.sideCartService.openSideCart();
  }
}
