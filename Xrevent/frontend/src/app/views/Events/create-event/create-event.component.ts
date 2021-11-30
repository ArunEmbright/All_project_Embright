import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventPhoto } from "../create-event/Model/evet.model";
import { EventPhotoService } from './evet-service/event-photo.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  forms: FormGroup;
  profile: EventPhoto;
  imageData:string;
  profiles: EventPhoto[] = [];
  private eventSubscription: Subscription;

  constructor(private eventService: EventPhotoService,  @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.forms= new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),

    });
    this.eventService.getProfiles();
    this.eventSubscription = this.eventService
      .getProfilesStream()
      .subscribe((profiles: EventPhoto[]) => {
        this.profiles = profiles;
      });
  }
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.forms.patchValue({ image: file });
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
    this.eventService.addProfile(this.forms.value.image);
    this.forms.reset();
    this.imageData = null;
    this.refreshPage();
  }
  onDelete(){
    this.eventService.deleteProfiles();

  }
  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }
}
