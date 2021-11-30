import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { TeamPhoto } from "../team-photo/teamphoto.model";

@Injectable({
    providedIn:'root'
})

export class TeamPhotoService{
    private profiles: TeamPhoto[] = []

  private profiles$ = new Subject<TeamPhoto[]>();

  readonly url="http://localhost:3000/teamPhoto"
  
  constructor(private http: HttpClient) { }

  getProfiles(){
    this.http.get<{profiles: TeamPhoto[]}>(this.url).pipe(
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
      .post<{ profile: TeamPhoto }>(this.url, profileData)
      .subscribe((profileData) => {
        const profile: TeamPhoto = {
          _id: profileData.profile._id,
         
          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }
  deleteProfiles(){
    this.http.delete<{profiles: TeamPhoto[]}>(this.url).pipe(
      map((profileData)=>{
        return profileData.profiles;
      })
      ).subscribe((profiles)=>{
        this.profiles= profiles;
        
        this.profiles$.next(this.profiles);
      })
    }
}