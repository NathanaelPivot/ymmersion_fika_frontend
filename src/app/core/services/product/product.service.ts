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

  createProduit(product: any): Observable<any> {
    return this.http.post(`${this.url}/produits`, product, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

  }

  // Récup tout les produits
  getProduits(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/produits`);
  }

  // Récup 1 produit avec ID
  getProduit(id: number): Observable<Product> {
    return this.http.get<any>(`${this.url}/produits/${id}`);
  }

  getProduitByCategorie(cat: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/produits/${cat}`);
  }

  // Récup Plats du Jour
  getPlatDuJour(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/produits/platDuJour`);
  }

  // Récup les promos 👍
  getPromo(): Observable<Product[]> {
    return this.http.get<any>(`${this.url}/produits/promo`);
  }

  updateProduit(product: Product) {
    console.log(product);
    return this.http.patch(`${this.url}/produits/${product.id}`, product);
  }

  // Supprimer un produit
  deleteProduit(productId: number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.url}/produits/${productId}`);
  }
}
