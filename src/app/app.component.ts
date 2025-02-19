import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader: boolean = true;
  showNavBar: boolean = true;

  constructor(private router: Router) {

    this.router.events.subscribe(() => {
      const noHeaderRoutes = ['/admin', '/auth'];
      this.showHeader = !noHeaderRoutes.some(route => this.router.url.startsWith(route));
    });

    this.router.events.subscribe(() => {
      const noNavBarAdminRoutes = ['/admin'];
      this.showNavBar = noNavBarAdminRoutes.some(route => this.router.url.startsWith(route));
    })
  }

}
