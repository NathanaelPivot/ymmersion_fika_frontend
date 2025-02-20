import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, // Injection du service d'authentification
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérez le token de manière synchrone
    const token = this.authService.getToken();

    // Si un token est présent, ajoutez-le dans les headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Format attendu par le backend
        }
      });
    }

    // Continuez le traitement de la requête
    return next.handle(request);
  }
}
