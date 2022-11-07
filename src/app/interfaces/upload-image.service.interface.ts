import { Observable } from "rxjs";

export interface IUploadImageService {
  uploadImage(image: File, path:string): Observable<string>;
}
