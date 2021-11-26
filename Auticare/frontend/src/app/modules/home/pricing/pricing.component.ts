import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/_services/auth.service';

declare var Razorpay;
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

export class PricingComponent implements OnInit {

  constructor(private flight:AuthService, private router:Router) { }

  ngOnInit(): void {
    
  }
//   options = {
//     "key": "rzp_live_9AnvOFdW5Q7jpD",
//     "amount": "500",
//     "currency": "INR",
//     "name": "Auticare", 
//     "description": "session booking",
//     "image": "assets/img/auticare-logo.png",
//     "handler": function(response:any){
//       alert('Success')
//     },
//     "prefill": {
//         "name": "Auticarte",
//         "email": "auticare@embrightinfotech.com",
//         "contact": "9999999999"
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc" 
//     }
// };

pricing1 = [

    {  image: "assets/images/app_landing1/header-1-bg.png" ,
       
      price:"INR 999",
      features1:"1 Skill Assessment",
     features2:"INR 999 ",
    
      btn:"Book Now",
      img: "assets/images/app_landing1/pricing/11.png" ,
     url:"1"
    },
    {image: "assets/images/app_landing1/header-1-bg.png",
      
    price:"INR 2897",
    features1:"3 Skill Assessment",
      features3:"INR 2997",
      btn:"Book Now",
      img: "assets/images/app_landing1/pricing/22.png" ,
      url:"2"
    },
    {image: "assets/images/app_landing1/header-1-bg.png",
      
    price:"INR 4795",
    features1:"5 Skill Assessment",
      features3:"INR 4995",
      btn:"Book Now",
      img: "assets/images/app_landing1/pricing/11.png" ,
      url:"3"
    }
  ]
  
  pricingcarouselOptions1= {
    items: 3,
    margin: 30,
    nav: false,
    autoplay: false,
    slideSpeed: 3000,
    paginationSpeed: 400,
    loop: false,
    dots: true,
    responsive: {
        0: {
            items: 1,
            margin: 10
        },
        600:{
            items: 2,
            margin: 10
        },
        992: {
            items: 3
        }
    }
  }
  // rzp = new Razorpay(this.options);
  // pay(){
  
  //   this.rzp.open()
  // }

  goToDetail(url){
    console.log(url)
    if(url==="1"){
      console.log("hello")
    
      const url = 'https://rzp.io/i/9d91HtJba';
    window.open(url, '_blank');
    }else if(url==="2"){
      console.log("hello")
    
      const url = 'https://rzp.io/i/7S0c2dkfd';
    window.open(url, '_blank');
    } else if(url==="3"){
      console.log("hello")
     
      const url = 'https://rzp.io/i/eYnSxOxjh';
    window.open(url, '_blank');
    }
  }

}
