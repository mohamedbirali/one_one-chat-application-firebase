import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, of, switchMap, concatMap, map, take, from } from 'rxjs';
import { UserProfileEntity } from 'src/app/entities/user-profile.entity';
import { IUserService } from 'src/app/interfaces/user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  usersCollection: string = 'users';

  get currentProfile$(): Observable<UserProfileEntity | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if(!user?.uid) {
          // alert('not found 1')
          return of(null);
        }
        const ref = doc(this.fireStore, this.usersCollection, user?.uid);
        return docData(ref) as Observable<UserProfileEntity>;
      }),
    );
  }

  get allUsers$(): Observable<UserProfileEntity[]> {
    const ref = collection(this.fireStore, this.usersCollection);
    const queryAll = query(ref);
    // alert('not found 2')

    return collectionData(queryAll) as Observable<UserProfileEntity[]>;
  }

  constructor(
    private readonly fireStore: Firestore,
    private readonly authService: AuthService) { }

  isUsernameExists(username: string): Observable<boolean> {
    return this.allUsers$.pipe(
      map((users): boolean => {
        for(let i=0; i<users.length; i++) {
          if(users[i].displayName?.includes(username)) {
            return true;
            // throw new Error(`${username} already exists`);
          }
        }
        return false;
      }),
      );
  }


  addUser(user: UserProfileEntity): Observable<any> {
    const ref = doc(this.fireStore, this.usersCollection, user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserProfileEntity): Observable<any> {
    const ref = doc(this.fireStore, this.usersCollection, user.uid);
    return from(updateDoc(ref, { ...user }));
  }

}
