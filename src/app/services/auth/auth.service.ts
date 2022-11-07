import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, UserCredential, UserInfo } from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { LoginDto } from 'src/app/dtos/login.dto';
import { RegisterDto } from 'src/app/dtos/register.dto';
import { IAuthFirebaseService } from 'src/app/interfaces/auth.service.interface';
import { IAuthHelper } from 'src/app/interfaces/helper.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthFirebaseService, IAuthHelper {

  constructor(private readonly auth: Auth) {
    // // TODO: add routers
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) {
          throw new Error('user not found');
        }
        return updateProfile(user, profileData);
      })
    );
  }

  // to check if user is logged in or not
  currentUser$ = authState(this.auth);

  login({email, password}: LoginDto): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));

    /*
      then(res=>{
      if(!res.user.emailVerified) {
        console.log(`this email ${email} is not verified yet`);
        return;
      }
    })
    */
  }

  register({ email, password}: RegisterDto){
    // TODO: send verification to ${email}
    return from(createUserWithEmailAndPassword(this.auth, email, password));

    /*
    .then(
      async (res: UserCredential) => {
        await sendEmailVerification(res.user, { url: `http://localhost:4200/login` });
      }
    ));
    */
  }

  logout(): Observable<any> {
    return(from(this.auth.signOut()));
  }
}

