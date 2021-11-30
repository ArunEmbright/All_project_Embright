import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../_models/auth-model';
import { authService } from '../../_services/auth-service';
import { navMenuItems } from "./_nav";

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-component.scss']
})

export class DefaultLayoutComponent implements OnInit {
   
    users:User[];
    public sidebarMinimized =false;
    public navItems = navMenuItems;
   
    constructor(private authService: authService
        ,  @Inject(DOCUMENT)  private _document: Document) { }

        ngOnInit(): void {
            this.authService.getUsers().subscribe((
              users:User[]
            )=>{
              this.users=users;
            });
          }
    toggleMinimize(e){
        this.sidebarMinimized=e;
    }
    loggOut(){
        this.authService.logout();
        
        this._document.defaultView.location.reload();
      }
}