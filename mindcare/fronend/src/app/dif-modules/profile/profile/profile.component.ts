import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { authService } from 'src/app/_services/auth-service';
import { User } from '../../../_models/auth-model';

export let browserRefresh =false
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  loading=false;
  imageData: string;
  users: User[]=[];
  selectedFiles: FileList;
  progressInfos = [];
  message: string[] = [];
  fileInfos: Observable<any>;
  imgSrc:any;
  firstName:any;
  lastName:any;
  email:any;
  dob:string;
  phoneNumber:number;
  subscription:Subscription;
  selectedListId: string;

  constructor(
    private accountService: authService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    })
  }

  ngOnInit(): void {
    this.accountService.getUsers().subscribe(data => {
      console.log(data[0])
      
       this.imgSrc = data[0].avatar
       this.firstName = data[0].firstName
       this.lastName = data[0].lastName
       this.email = data[0].email,
       this.dob = data[0].dob,
       this.phoneNumber=data[0].phoneNumber
    });
  }

  selectFiles(event) {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); 
  
        reader.onload = (event) => { 
          this.imgSrc = event.target.result;
        }
      }
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
    
  }

  uploadFiles() {
    this.message = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
   
   
  }
  
  refreshPage() {
    this._document.defaultView.location.reload();
  }

  upload(idx, file) {
    this.loading=true;
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.accountService.upload(file).subscribe(
      (event) => {
        if (event instanceof HttpResponse) {
          this.fileInfos = this.accountService.getUsers();
        }
        this.refreshPage();
      },
      (err) => {
        this.progressInfos[idx].percentage = 0;
        this.loading=false
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg, err);
      }
    );
   
  }

  refresh(): void {
    window.location.reload();
  }
}
