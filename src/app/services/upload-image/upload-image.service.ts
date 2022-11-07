import { IUploadImageService } from './../../interfaces/upload-image.service.interface';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { getDownloadURL, Storage, UploadResult } from '@angular/fire/storage';
import { ref, uploadBytes } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService implements IUploadImageService  {

  constructor(private storage: Storage) { }
  
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask$ = from(uploadBytes(storageRef, image));
    return uploadTask$.pipe(
      switchMap((result:UploadResult) => getDownloadURL(result.ref))
    );
  }
}
