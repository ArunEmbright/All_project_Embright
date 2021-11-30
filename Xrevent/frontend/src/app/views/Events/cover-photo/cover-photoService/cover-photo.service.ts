import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoverModel } from '../Cove.Model/cover.model';

@Injectable({
  providedIn: 'root'
})
export class CoverPhotoService {

  private profiles: CoverModel[] = []

  private profiles$ = new Subject<CoverModel[]>();

  readonly url="http://localhost:3000/coverphoto"
  
  constructor(private http: HttpClient) { }

  getProfiles(){
    this.http.get<{profiles: CoverModel[]}>(this.url).pipe(
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
  addProfile(image: File): void {
    const profileData = new FormData();
    profileData.append("image", image);
    this.http
      .post<{ profile: CoverModel }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: CoverModel = {
          _id: profileData.profile._id,
         
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
  deleteProfiles(){
    this.http.delete<{profiles: CoverModel[]}>(this.url).pipe(
      map((profileData)=>{
        return profileData.profiles;
      })
      ).subscribe((profiles)=>{
        this.profiles= profiles;
        
        this.profiles$.next(this.profiles);
      })
    }
}
