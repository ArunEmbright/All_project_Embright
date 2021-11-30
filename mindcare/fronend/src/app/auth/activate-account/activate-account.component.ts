import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { authService } from 'src/app/_services/auth-service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  token: any;

  constructor(private router: Router
    , private authService: authService
    , private route: ActivatedRoute) { 
      this.token = this.route.snapshot.params.token;
    }

  ngOnInit(): void {
  }

  accountOpen(){
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'Account activated',
      showConfirmButton:false,
      timer:1500
    })
  }

  expired(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:'Token has been expired',
      showConfirmButton:false,
      timer:1500
    })
  }
  activate(){
    this.authService.accoutnActivation(this.token).subscribe(
      dt=>{
        console.log(dt);
        setTimeout(()=>{
          this.router.navigate(['/mindcare/auth/login'])
          this.accountOpen();
        },1500)
      },
     ()=>{
        this.expired()
      }
    )
  }

}
