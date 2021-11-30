import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Main-Services/AuthService';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls:['./default.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  url="./assets/img/avatars/1.jpg";
username=""
  public sidebarMinimized = false;
  public navItems = navItems;

  
  constructor(private authService: AuthService ){
  
      
  }
  toLogout(){
    this.authService.logout();
   }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(){}


}
