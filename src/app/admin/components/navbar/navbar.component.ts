import {Component, effect, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    effect(() => {
      const user = this.authService.user();
      this.userName = user?.name || '';
      console.log('Nom de l’utilisateur récupéré :', this.userName);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
