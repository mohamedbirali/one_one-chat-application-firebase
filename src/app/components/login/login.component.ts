import { Component, OnInit } from '@angular/core';
import { loginValidation } from 'src/app/form-validations/login.form.validation';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ng add @ngneat/hot-toast
  // or add animations
  constructor(private readonly authService: AuthService, private router: Router, private toast: HotToastService) { }

  // form validations
  loginForm: FormGroup = loginValidation;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  ngOnInit(): void {}

  onLogin(){
    // this.authService.login(this.loginDto.email, this.loginDto.password).subscribe(
      if (!this.loginForm.valid) return;

      this.authService.login(this.loginForm.value).pipe(
        this.toast.observe({
          success: 'logged in successfully',
          loading: 'loading ...',
          error: ({message}) => `${message}`,
        })
      ).subscribe(
        () => {
          this.router.navigate(['']);
          console.log(`logged in`)
        },
      );
  }

}
