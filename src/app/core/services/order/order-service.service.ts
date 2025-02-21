import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private readonly url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    console.log(order);
    return this.http.post<any>(`http://localhost:3000/orders`, order);
  }
}
