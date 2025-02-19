import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); // Injection du Router Angular

  const token = await authService.getToken();
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    console.log('Aucun token détecté, redirection vers /auth/login');
    router.navigate(['/auth/login']); // Utilisation de Angular Router
    return false;
  }

  console.log('Utilisateur authentifié, accès autorisé');
  return true;
};
