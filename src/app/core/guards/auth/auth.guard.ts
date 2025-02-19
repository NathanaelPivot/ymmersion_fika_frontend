import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    console.log('Aucun token, redirection vers /auth/login');
    window.location.href = '/auth/login';
    return false;
  }

  console.log('Utilisateur authentifié, accès autorisé');
  return true;
};
