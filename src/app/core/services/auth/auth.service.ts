import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subscription, switchMap, tap} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {User} from '../../models/user.model';
import {CreateUser} from '../../models/createUser.model';
import {CookieService} from 'ngx-cookie-service';

export interface credentials {
  email: string,
  password: string,
  rememberMe?: boolean,
}

export interface resetPassword {
  password: string,
  resetToken: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private messageCodes: { [code: string]: string } = {
    'incorrect-credentials': 'Email or password invalid.',
    'forbidden-action': 'You don’t have permission to perform this action.',
    'invalid-token': 'Invalid or expired token.',
    'unauthorized-access': 'Access unauthorized.',
    'missing-fields': 'Required fields are missing.',
    'invalid-input-format': 'Invalid input format.',
    'resource-not-found': 'Ressource not found.',
    'too-many-request': 'Too many requests.',
    'password-strength-error': 'Your password does not meet the requirements',
    'email-not-verified': 'Please verify your email address',
    'alreadyExists': 'Already exists',
    'conflict-error': 'Data conflict detected, please resolve conflicts',
    'email-succes': 'Email successfully send',
  }

  private http = inject(HttpClient);

  user = signal<User | null | undefined>(undefined)
  createUser = signal<CreateUser | null | undefined>(undefined)
  token: string | null = null;
  private userRole: string | null = null;

  constructor(
    private cookieService: CookieService
  ) {

  }

  login(credentials: credentials): Observable<User | null | undefined> {
    console.log(credentials);

    return this.http.post<{ accessToken: string, refreshToken: string }>(environment.apiUrl + '/auth/login', credentials).pipe(
      tap((result: any) => {
        console.log('Réponse backend (login):', result);
        this.cookieService.set('token', result.accessToken, { path: '/' }); // Stocke l'accessToken
      }),
      switchMap(() => this.getUser()), // Récupère les informations de l'utilisateur avec getUser()
      tap((user) => {
        console.log('Utilisateur après login:', user);
      })
    );
  }

  register(credentials: credentials): Observable<CreateUser | null | undefined> {
    console.log(credentials);
    return this.http.post<User>(environment.apiUrl + '/auth/register', credentials).pipe(
      tap((result: any) => {
        const user = Object.assign(new CreateUser(), result);
        this.createUser.set(user);
      }),
      map((result: any) => {
        return this.createUser();
      })
    )
  }

  forgotPassword(email: string): Observable<User | null | undefined> {
    console.log(email);
    return this.http.post<User>(environment.apiUrl + '/auth/forgot-password', email);
  }

  resetPassword(resetPassword: resetPassword): Observable<User | null | undefined> {
    console.log(resetPassword);
    return this.http.post<User>(environment.apiUrl + '/auth/reset-password', resetPassword);
  }

  getUser(): Observable<User | null | undefined> {
    const token = this.cookieService.get('token'); // Récupérer le token depuis le cookie
    console.log('Token utilisé pour getUser:', token);
    return this.http.get<User>(environment.apiUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${token}` // Ajouter le token au header Authorization
      }
    }).pipe(
      tap((result: any) => {
        console.log('Réponse de getUser:', result);
        const user = Object.assign(new User(), result); // Mapper les données utilisateur
        this.user.set(user); // Mettre à jour le signal user
      }),
      map(() => {
        return this.user();
      })
    );
  }

  isAdmin(): boolean {
    const user = this.user(); // Récupérer instantanément l'utilisateur depuis le signal
    console.log('Utilisateur actuel :', user);
    return user?.Role?.role === 'admin' || user?.role === 'admin'; // Vérifiez les deux sources
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  logout(): void {
    this.cookieService.delete('token', '/')
    this.user.set(null);
  }

  getMessage(code: string): string {
    return this.messageCodes[code] || 'Unknown error';
  }
}
