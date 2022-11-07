import { HotToastService } from '@ngneat/hot-toast';

import { registerValidation } from 'src/app/form-validations/register.form.validation';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { switchMap, concatMap, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(
          private readonly authService:AuthService,
          private readonly userService: UserService,
          private router: Router,
          private toast: HotToastService,
    ) { }

    registerForm: FormGroup = registerValidation;

    isUsernameExists!: boolean;

    get username() {
      return this.registerForm.get('username');
    }

    get email() {
      return this.registerForm.get('email');
    }

    get password() {
      return this.registerForm.get('password');
    }

    get confirmPassword() {
      return this.registerForm.get('confirmPassword');
    }

    ngOnInit(): void {
    }

    onRegister(){
        if(!this.registerForm.valid) return;
        this.userService.isUsernameExists(this.username?.value).subscribe(
          (found) => {
            if(found) {
              this.isUsernameExists = found;
            }
          }
        );
        if(this.isUsernameExists) {
            this.toast.error(`${this.username?.value} already exists`);
          return;
        }

        const { username, email, } = this.registerForm.value;
        this.authService.register(this.registerForm.value).pipe(
          switchMap(({ user: { uid } }) => {
            return this.userService.addUser({ uid, displayName: username, email })}
          ),
          this.toast.observe({
            success: 'account created',
            loading: 'checking crendentials',
            error: ({message}) => `${message}`,
          })
        ).subscribe(
          () => {
            this.router.navigate([''])
          }
        )
    }

}
