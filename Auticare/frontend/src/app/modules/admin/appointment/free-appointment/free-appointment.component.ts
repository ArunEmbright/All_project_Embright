import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/_services/auth.service';
import { AdminService } from '../../admin.service';
import { User } from 'src/app/core/models/auth.models';
@Component({
  selector: 'app-free-appointment',
  templateUrl: './free-appointment.component.html',
  styleUrls: ['./free-appointment.component.scss']
})
export class FreeAppointmentComponent implements OnInit {
  users:User[];
  constructor(private auth:AdminService) { }

  ngOnInit(): void {
    this.auth.getAppointment().subscribe((
      users:User[]
    )=>{
      this.users=users;
      console.log(users.length)
    })
  }

}
