import { Component,Inject, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/_services/auth.service';
import { AdminService } from '../../admin.service';
import { User } from 'src/app/core/models/auth.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
declare var M: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  users:User[];
  
  statData;
  constructor(private accountService: AdminService,private router: Router,@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.accountService.getUser().subscribe((
      users:User[]
    )=>{
      this.users=users;
      console.log(users.length)
      console.log(users)
    })


    // fetches the data
   

  /**
   * Fetches the data
   */

  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
  onEdit(user){

  }
  onDelete(_id:string){
    if(confirm('Are you sure to delete')==true){
      this.accountService.deleteUser(_id).subscribe((res)=>{
        this.refreshPage();
       
        M.toast({html:'Deleted', classes:'rounded'})
      })
    }
  }
}
