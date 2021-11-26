import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AuthAdminService } from 'src/app/guards/admin.guard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users:User[];
  // dataSource = new MatTableDataSource();
order:any ="college";
  constructor(private router: Router,private admin: AuthAdminService,private list: UserService) { }

  ngOnInit() {
    this.list.getUser().subscribe((users:User[]|any)=>{
      this.users=users
      console.log(users)
          })
  }
 
  // applyFilter(filterValue: string) {
  //   let filter = {
  //     name: filterValue.trim().toLowerCase(),
  //     position: filterValue.trim().toLowerCase(),
  //     topFilter: true
  //   }
  //   this.dataSource.filter = JSON.stringify(filter)
  // }
 onSubmit(){
   this.admin.signOut()
 }
 onNavigate(){
  this.router.navigate(['/payment-Details']);
 }
  }


