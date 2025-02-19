import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  // Récup tout les produits
  getProduits(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/produits`);
  }

  // Récup 1 produit avec ID
  getProduit(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/produits/${id}`);
  }

  // Récup Plats du Jour
  getPlatDuJour(): Observable<Product[]> {
    return this.http.get<any>(`${this.url}/produits/platDuJour`);
  }

  // Récup les promos 👍
  getPromo(): Observable<any> {
    return this.http.get<any>(`${this.url}/produits/promo`);
  }

  // Supprimer un produit
  deleteProduit(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${productId}`);
  }
}
