import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { User } from 'src/app/core/models/auth.models';
@Component({
  selector: 'app-therapy-session',
  templateUrl: './therapy-session.component.html',
  styleUrls: ['./therapy-session.component.scss']
})
export class TherapySessionComponent implements OnInit {
  users:User[];

  constructor(private auth:AdminService) { }

  ngOnInit(): void {
    this.auth.getBooking().subscribe((
      users:User[]
    )=>{
      this.users=users;
      console.log(users)
    }) 
  }

}
