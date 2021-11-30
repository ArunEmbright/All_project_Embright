import { Injectable } from "@angular/core";
import { WebRequestService } from "../../../Main-Services/WebRequestService";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../settings/Profile";
import { SpeakerImage } from "../speaker-models/speaker.model";
import "rxjs/add/operator/catch";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "any",
})
export class SpeakerStorageService {
  private profiles: SpeakerImage[] = [];
  private profiles$ = new Subject<SpeakerImage[]>();
  readonly baseurl = "http://localhost:3000";
  result: any;
  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient
  ) {}
  getImages() {
    return this.http.get(this.baseurl);
  }

  getSingleImage(_id: string) {
    return this.http.get(this.baseurl + `speakers/storage/speaker/${_id}`);
  }
  newImage(name: string, image: File): void {
    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("image", image, name);
    this.http
      .post<{ profile: SpeakerImage }>(
        this.baseurl + `speakers/storage/speaker`,
        profileData
      )
      .subscribe((profileData) => {
        const profile: SpeakerImage = {
          _id: profileData.profile._id,

          imagePath: profileData.profile.imagePath,
        };
        this.profiles.push(profile);
        this.profiles$.next(this.profiles);
      });
  }

  deleteImage(_id: string) {
    return this.http.delete(this.baseurl + `/api/speaker/${_id}`);
  }
}
