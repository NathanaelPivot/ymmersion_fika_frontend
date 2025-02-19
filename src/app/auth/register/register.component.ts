import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateUser} from "../../core/models/createUser.model";
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  private registerSubscripton: Subscription | null = null;
  isDarkMode: boolean = false;

  private StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{8,}$/;

  private StrongNameRegx: RegExp =
    /^[a-zA-Z\s-]+$/

  registerFormGroup!: FormGroup;

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.StrongNameRegx)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.StrongPasswordRegx)]],
    });
    this.detectDarkMode();
  }

  detectDarkMode(): void {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  invalidCredentials: boolean = false;
  error: string = '';
  messageError: string = '';

  register() {
    this.registerSubscripton = this.authService.register(this.registerFormGroup.value as CreateUser).subscribe({
      next: (result: CreateUser | null | undefined) => {
        this.navigateHome();
      },
      error: (error) => {
        console.error(error.error.err.response.code);
        this.invalidCredentials = true;

        this.error = error.error.err.response.code;
        this.messageError = this.authService.getMessage(this.error.toString());
      }
    });
  }

  get nameFormField() {
    return this.registerFormGroup.get('name');
  }
  get emailFormField() {
    return this.registerFormGroup.get('email');
  }
  get passwordFormField() {
    return this.registerFormGroup.get('password');
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.registerSubscripton) {
      this.registerSubscripton.unsubscribe();
    }
  }
}
