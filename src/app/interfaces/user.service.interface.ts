import { Observable } from "rxjs";
import { UserProfileEntity } from "../entities/user-profile.entity";

export interface IUserService {
  addUser(user: UserProfileEntity): Observable<any>;
  updateUser(user: UserProfileEntity): Observable<any>;
  isUsernameExists (username: string): Observable<boolean>;
}
