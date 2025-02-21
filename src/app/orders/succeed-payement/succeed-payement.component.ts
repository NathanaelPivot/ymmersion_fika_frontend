import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-succeed-payement',
  templateUrl: './succeed-payement.component.html',
  styleUrl: './succeed-payement.component.scss'
})
export class SucceedPayementComponent {

  noCmd: number = 0

  constructor(private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  paramValue: string | null = null;

  ngOnInit(): void {
    this.paramValue = this.route.snapshot.paramMap.get('verify');

    this.noCmd = 401;

    let valeur: string | null = ''

    if (this.isLocalStorageAvailable() && valeur !== null) {
      valeur = localStorage.getItem('cart');
    }


    valeur = '[]'

    if (valeur !== null || valeur === '[]') {
      localStorage.setItem('cart', valeur);
    }

  }

  reload() {
    window.location.reload();

  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }


}
