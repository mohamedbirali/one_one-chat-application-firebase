import { FormGroup, FormControl, Validators } from '@angular/forms';

export const loginValidation = new FormGroup({
      email: new FormControl('', [
              Validators.required,
              Validators.email
            ]),
      password: new FormControl('', [
                 Validators.required,
                 Validators.minLength(8)
              ]),
});
