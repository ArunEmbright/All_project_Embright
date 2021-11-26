import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/_services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
userId :string;
  constructor(public route: Router,private accountService: AuthService) { }

  ngOnInit(): void {
    this.accountService.getUsers().subscribe((res)=>{
      
     this.userId = res[0].userId;
      console.log(this.userId)
    })
  }
start(){
 
  setTimeout(() => {
    this.accountService.checkScore(this.userId).subscribe(data=>{
      this.route.navigate(['/assessments/assessment'])
      console.log( data)
  
   
   },
   (err) => {
   console.log(err)
   this.route.navigate(['assessments/result'])
    
    
   });
  }, 150);
  
  

} 
startEd(){
  this.route.navigate(['/assessments/assessment'])
}

}
