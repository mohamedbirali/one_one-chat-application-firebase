import { FormControl, FormGroup, Validators } from "@angular/forms";

export const profileValidation: FormGroup = new FormGroup({
  uid: new FormControl('', ),
  firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  // email: new FormControl('', [Validators.required, Validators.email]),
  phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
});
