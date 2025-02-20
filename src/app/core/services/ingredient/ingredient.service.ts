import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private readonly url: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  getIngredients() : Observable<any> {
    return this.http.get(`${this.url}/ingredient`);
  }

}
