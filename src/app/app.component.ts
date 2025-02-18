import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader: boolean = true;

  constructor(private router: Router) {
    // Surveillez les changements de route
    this.router.events.subscribe(() => {
      // Liste des routes sur lesquels le header ne doit pas apparaître
      const noHeaderRoutes = ['/admin', '/auth'];
      // Vérifiez la route actuelle
      this.showHeader = !noHeaderRoutes.some(route => this.router.url.startsWith(route));
    });
  }

}
