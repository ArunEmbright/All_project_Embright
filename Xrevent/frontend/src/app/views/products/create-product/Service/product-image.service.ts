import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductImage } from '../Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private profiles: ProductImage[] = []

  private profiles$ = new Subject<ProductImage[]>();
  readonly url = 'http://localhost:3000/api/product'
  constructor(private http: HttpClient) { }

  getProfiles(){
    this.http.get<{profiles: ProductImage[]}>(this.url).pipe(
    map((profileData)=>{
      return profileData.profiles;
    })
    ).subscribe((profiles)=>{
      this.profiles= profiles;
      
      this.profiles$.next(this.profiles);
    })
  }
  getProfilesStream() {
    return this.profiles$.asObservable();
  }
  addProfile(name: string, image: File): void {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);
    this.http
      .post<{ profile: ProductImage }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: ProductImage = {
          _id: profileData.profile._id,
         
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
  deleteProfiles(){
    this.http.delete<{profiles: ProductImage[]}>(this.url).pipe(
      map((profileData)=>{
        return profileData.profiles;
      })
      ).subscribe((profiles)=>{
        this.profiles= profiles;
        
        this.profiles$.next(this.profiles);
      })
    }
}
