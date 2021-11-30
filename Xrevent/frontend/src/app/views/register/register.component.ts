import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Main-Services/AuthService';
import { Profile } from '../settings/profile/pofile-models/profile.model'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  onSignupButtonClicked(
    firstName: string,
    lastName: string, 
    teamName: string,
    phoneNumber:string,
    location: string,
    address:string,
    email: string, 
    password: string
    ) {
    this.authService.resgister( 
      firstName,
      lastName,
      teamName,
      phoneNumber,
      location,
      address,
       email, 
       password
       ).subscribe((list: HttpResponse<any>) => {
      console.log(list);
      this.router.navigate(['/login']);
    });
  }


}
