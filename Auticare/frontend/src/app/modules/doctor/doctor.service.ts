import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { shareReplay } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { WebRequestService } from "../auth/_services/Web-RequestURL";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/auth.models";
import { catchError, map, tap } from "rxjs/operators";
const backURL = `${environment.apiURL}`;


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private webService: WebRequestService,
    private http: HttpClient,
    private router: Router) { }


    getSessionBooking(){
      return this.http.get(`${backURL}/Therapist/session`, {
        headers: {
          "x-access-token": this.getAccessToken(),
        },
      });
    }
    getProfile(){
      return this.http.get(`${backURL}/Therapist/user`, {
        headers: {
          "x-access-token": this.getAccessToken(),
        },
      });
    }
    getAccessToken() {
      return localStorage.getItem("x-access-token");
    }
    deleteTherapist(_id:string){
      return this.http.delete(`${backURL}/therapist/therapist`+`/${_id}`)
    }
    getSingleTherapist(_id:string) {
      return this.http.get(`${backURL}/admin/therapist/${_id}`, {
        // headers: {
        //   'x-access-token': this.getAccessToken(),
        // }
      });
    }
    updateUser(_id:string,params:any){
      console.log(params)
      return this.http.patch(`${backURL}/therapist/therapist/${_id}`,params).pipe(
        map((res) => {
          // login successful if there's a jwt token in the response
          return res;
        })
      );
      
    }
}
