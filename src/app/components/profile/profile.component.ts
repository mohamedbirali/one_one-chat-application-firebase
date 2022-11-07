import { UserProfileEntity } from 'src/app/entities/user-profile.entity';
import { UploadImageService } from './../../services/upload-image/upload-image.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { profileValidation } from 'src/app/form-validations/profile.form.validations';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.currentProfile$;

  profileForm: FormGroup = profileValidation;

  get displayName() {
    return this.profileForm.get('displayName');
  }

  // get email() {
  //   return this.profileForm.get('email');
  // }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  constructor(
    // private readonly authService: AuthService,
    private readonly uploadImageService: UploadImageService,
    private readonly userService: UserService,
    private readonly toast: HotToastService,
  ) { }

  ngOnInit(): void {
    // to unsubscribe : npm i @ngneat/until-destroy --save
    this.userService.currentProfile$
    .pipe(untilDestroyed(this))
    .subscribe(
      (user) => this.profileForm.patchValue({ ...user }),
    );
  }

  uploadImage(event: any, user: UserProfileEntity) {
    this.uploadImageService
        .uploadImage(event.target.files[0], `/profile-images/${user.uid}`)
        .pipe(
          this.toast.observe({
            loading: 'uploading your image ...',
            success: 'uploaded',
            error: ({ message }) => `${message}`,
          }),
          concatMap(
            (photoURL: string) => this.userService.updateUser({ uid: user?.uid, photoURL })
          ),
        ).subscribe();
  }

  saveProfile(user: UserProfileEntity){
    if(!this.profileForm.get('displayName')?.value) return;
    this.userService
        .updateUser(user)
        .pipe(
          this.toast.observe({
            loading: 'updating profile ...',
            success: 'updated',
            error: 'error / try again!',
          }),
        ).subscribe();
  }
}
