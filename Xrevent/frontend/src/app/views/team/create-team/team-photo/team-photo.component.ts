import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TeamPhotoService } from './team.photo.service';
import { TeamPhoto } from './teamphoto.model';

@Component({
  selector: 'app-team-photo',
  templateUrl: './team-photo.component.html',
  providers:[TeamPhotoService],
  styleUrls: ['./team-photo.component.scss']
})
export class TeamPhotoComponent implements OnInit {

  form: FormGroup;
  profile: TeamPhoto;
  imageData:string;
  profiles: TeamPhoto[] = [];
  
  private teamPhotoSubscription: Subscription;

  constructor(private teamPhotoService: TeamPhotoService,  @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {this.form= new FormGroup({
    name: new FormControl(null),
    image: new FormControl(null),

  });
  this.teamPhotoService.getProfiles();
  this.teamPhotoSubscription = this.teamPhotoService
    .getProfilesStream()
    .subscribe((profiles: TeamPhoto[]) => {
      this.profiles = profiles;
    });
}


onFileSelect(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({ image: file });
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (file && allowedMimeTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
refreshPage(){
  this._document.defaultView.location.reload();
}
onSubmit(){
  this.teamPhotoService.addProfile(this.form.value.image);
  this.form.reset();
  this.imageData = null;
  this.refreshPage();
}
onDelete(){
  this.teamPhotoService.deleteProfiles();

}
ngOnDestroy() {
  this.teamPhotoSubscription.unsubscribe()
}
}
