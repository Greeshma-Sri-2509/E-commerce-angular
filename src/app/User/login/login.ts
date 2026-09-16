import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private authService = inject(AuthService)

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return;
    }
    const {email, password} =this.loginForm.getRawValue()
    const success = this.authService.login(email, password)
    if(success){
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/product';

    this.router.navigateByUrl(returnUrl)
    }

  }
}
