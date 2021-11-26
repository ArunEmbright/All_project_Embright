import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AuthService } from '../auth/_services/auth.service';
import { WebRequestService } from '../auth/_services/Web-RequestURL';
import { environment } from 'src/environments/environment';
const backURL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  data: any;
  preValue : any ="0";
  AutismState:string;
  constructor(private auth:AuthService,private http: HttpClient, private webReq:WebRequestService) { }



  score(sum: any) {
    
    var first = parseInt(sum);
    var second = parseInt(this.preValue);
    this.preValue = Number(first + second);
    //  console.log(first)
    //  console.log(second)
    console.log(this.preValue);
  }

scoreApi(patientName,age,userId){
  if(this.preValue < 70){
    this.AutismState = "No Autism"
  }
  else if(this.preValue >=70 && this.preValue <= 106){
    this.AutismState = "Mild Autism"
  }else if(this.preValue >=106 && this.preValue <= 153){
    this.AutismState = "Moderate Autism"
  }else if(this.preValue >153){
    this.AutismState = "Serve Autism"
  }
  this.data = {
    sum: this.preValue,
    patientName,
    age,
    userId,
    degreeOfAutism:this.AutismState
    
  };
  console.log("data",this.preValue)
  return this.http.post(`${backURL}/auth/score`, this.data, {
    headers: {
      "x-access-token": this.auth.getAccessToken(),
    },
    responseType: 'text'});
  
}
getList() {
  return this.http.get(`${backURL}/auth/score`, {
    headers: {
      "x-access-token": this.auth.getAccessToken(),
    },
  });
}
}
