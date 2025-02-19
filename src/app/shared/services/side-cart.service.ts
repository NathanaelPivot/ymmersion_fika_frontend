import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideCartService {
  private sideCartOpen = new BehaviorSubject<boolean>(false);
  sideCartOpen$ = this.sideCartOpen.asObservable();

  openSideCart() {
    this.sideCartOpen.next(true);
  }
  closeSideCart() {
    this.sideCartOpen.next(false);
  }
}
