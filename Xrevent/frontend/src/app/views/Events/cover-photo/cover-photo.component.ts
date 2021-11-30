import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoverModel } from './Cove.Model/cover.model';
import { CoverPhotoService } from './cover-photoService/cover-photo.service';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.scss']
})
export class CoverPhotoComponent implements OnInit {

  form: FormGroup;
  profile: CoverModel;
  imageData:string;
  profiles: CoverModel[] = [];
  private coverPhotoSubscription: Subscription;
  constructor(private coverPhotoService: CoverPhotoService, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {this.form= new FormGroup({
    name: new FormControl(null),
    image: new FormControl(null),

  });
  this.coverPhotoService.getProfiles();
  this.coverPhotoSubscription = this.coverPhotoService
    .getProfilesStream()
    .subscribe((profiles: CoverModel[]) => {
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
  this.coverPhotoService.addProfile(this.form.value.image);
  this.form.reset();
  this.imageData = null;
  this.refreshPage();
}
onDelete(){
  this.coverPhotoService.deleteProfiles();

}
ngOnDestroy() {
  this.coverPhotoSubscription.unsubscribe()
}

}
