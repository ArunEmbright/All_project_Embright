import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventPhoto} from "../Model/evet.model";

@Injectable({
  providedIn: 'root'
})
export class EventPhotoService {

  private profiles: EventPhoto[] = []

  private profiles$ = new Subject<EventPhoto[]>();
  
  readonly url ="http://localhost:3000/event"
  
  constructor(private http:HttpClient) { }

  getProfiles(){
    this.http.get<{profiles: EventPhoto[]}>(this.url).pipe(
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
      .post<{ profile: EventPhoto }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: EventPhoto = {
          _id: profileData.profile._id,
         
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
  deleteProfiles(){
    this.http.delete<{profiles: EventPhoto[]}>(this.url).pipe(
      map((profileData)=>{
        return profileData.profiles;
      })
      ).subscribe((profiles)=>{
        this.profiles= profiles;
        
        this.profiles$.next(this.profiles);
      })
    }
}

