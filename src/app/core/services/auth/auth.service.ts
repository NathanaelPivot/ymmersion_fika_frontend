import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
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

  constructor(
    private cookieService: CookieService
  ) {

  }

  login(credentials: credentials): Observable<User | null | undefined> {
    console.log(credentials);
    return this.http.post<User>(environment.apiUrl + '/auth/login', credentials).pipe(
      tap((result: any) => {
        this.cookieService.set('token', result.accessToken, { path: '/' });
        const user = Object.assign(new User(), result['user']);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    )
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
    return this.http.get<User>(environment.apiUrl + '/auth/user').pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user);
      }),
      map((result: any) => {
        return this.user();
      })
    )
  }

  async getToken(): Promise<string | null> {
    const cookieValue = this.cookieService.get('token')
    console.log(cookieValue);
    if (!cookieValue) {
      return null;
    }
    return cookieValue;
  }

  logout(): void {
    this.cookieService.delete('token', '/')
    this.user.set(null);
  }

  getMessage(code: string): string {
    return this.messageCodes[code] || 'Unknown error';
  }
}
