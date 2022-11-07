import { Observable } from "rxjs";
import { UserCredential, UserInfo } from '@angular/fire/auth'
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";

export interface IAuthFirebaseService {
  // PLATFORM_ID && isPlateFormServer
  // login(email: string, password: string): Observable<any>;
  login({email, password}:LoginDto): Observable<any>;
  // send email verification too

  register({ email, password }: RegisterDto): Observable<void> | Observable<UserCredential>;

  updateProfileData(profileData: Partial<UserInfo> ): Observable<any>;

  logout(): Observable<any>;
}
