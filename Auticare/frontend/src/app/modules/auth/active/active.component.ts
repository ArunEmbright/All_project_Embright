import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  token: any;
  constructor(public route: Router, private api : AuthService,private router:ActivatedRoute) { 
    this.token = this.router.snapshot.params.token;
  }

  ngOnInit(): void {
  }
  activate(){
    this.api.activate(this.token).subscribe(
      data =>{
        console.log('Registration Success. Please Signin...')
        this.successAlert();
   
        console.log(data);
        setTimeout(() => {
          this.route.navigate(['/login'])
        }, 2000);
      },
      error => {
        console.log('Your link is expired')
        this.inCorrectAuthorization()
        console.log(error)
      }
    )
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Your Account is ready! let log in',
      showConfirmButton: false,
      timer: 3000
    }).then((result) => {
      this.route.navigate(['/auth/login']);
    });
  }
  inCorrectAuthorization(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:'Your link is expired',
      showConfirmButton:false,
      timer:1500
    })
  }
}
