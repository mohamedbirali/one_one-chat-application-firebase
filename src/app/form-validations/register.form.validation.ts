import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const registerValidation: FormGroup = new FormGroup({
    username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
              ]),
    email: new FormControl('', [
            Validators.required,
            Validators.email,
          ]),
    password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
          ]),
    confirmPassword: new FormControl('', [
            Validators.required,
          ],),
  },
  {
    validators: passwordMatchValidator()
  }
);

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if ( password && confirmPassword && password !== confirmPassword ) {
      return {
        passwordDsntMatch: true,
      }
    }
    return null;
  }
}
