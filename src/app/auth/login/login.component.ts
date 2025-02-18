import {Component, OnInit} from '@angular/core';
import {AuthService, credentials} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  private loginSubscripton: Subscription | null = null;
  loginFromGroup!: FormGroup;

  ngOnInit(): void {
    this.loginFromGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  invalidCredentials: boolean = false;
  error: string = '';
  messageError: string = '';


  login() {
    this.loginSubscripton = this.authService.login(this.loginFromGroup.value as credentials).subscribe({
        next: (result: User | null | undefined) => {
          this.navigateHome();
        },
        error: (error) => {
          console.error(error.error.err.response.code);
          this.invalidCredentials = true;

          this.error = error.error.err.response.code;
          this.messageError = this.authService.getMessage(this.error.toString());
        }
      }
    )
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.loginSubscripton) {
      this.loginSubscripton.unsubscribe();
    }
  }

}
