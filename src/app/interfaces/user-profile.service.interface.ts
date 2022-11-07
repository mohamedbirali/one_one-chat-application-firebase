import { Observable } from "rxjs";
import { UserProfileEntity } from "../entities/user-profile.entity";

export interface IUserProfile {
  // also check if user is connected
  get currentUser$(): Observable<UserProfileEntity | null>;

  createUser(user: UserProfileEntity): Observable<boolean>;

  updateUser(user: UserProfileEntity): Observable<boolean>;
}
