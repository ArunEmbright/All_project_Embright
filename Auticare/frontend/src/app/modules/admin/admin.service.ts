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
export class AdminService {

  constructor(private webService: WebRequestService,
    private http: HttpClient,
    private router: Router) { }



//**********User Action ********//
  getUser() {
    return this.http.get(`${backURL}/admin/users`, {
      // headers: {
      //   'x-access-token': this.getAccessToken(),
      // }
    });
  }
  getSingleUser(_id:string) {
    return this.http.get(`${backURL}/admin/users/${_id}`, {
      // headers: {
      //   'x-access-token': this.getAccessToken(),
      // }
    });
  }
  addUser(params: any) {
    return this.http.post<any>(`${backURL}/admin/addUser`, params).pipe(
      map((res) => {
        // login successful if there's a jwt token in the response
        return res;
      })
    );
  }
  sessionBooking(params: any) {
    return this.http.post<any>(`${backURL}/auth/sessionBooking`, params).pipe(
      map((res) => {
        // login successful if there's a jwt token in the response
        return res;
      })
    );
  }
  deleteUser(_id:string){
    return this.http.delete(`${backURL}/admin/users`+`/${_id}`)
  }
updateUser(_id:string,params:any){
  console.log(params)
  return this.http.patch(`${backURL}/admin/users/${_id}`,params).pipe(
    map((res) => {
      // login successful if there's a jwt token in the response
      return res;
    })
  );
  
}

//**********Score Action ********//
  
  getScore() {
    return this.http.get(`${backURL}/admin/result`, {
      
    });
  }
  //**********Activity Action ********//
  getActivity() {
    return this.http.get(`${backURL}/admin/getActivity`, {
      
    });
  }
  getSingleActivity(_id:string) {
    return this.http.get(`${backURL}/admin/activity/${_id}`, {
      // headers: {
      //   'x-access-token': this.getAccessToken(),
      // }
    });
  }
  deleteActivity(_id:string){
    return this.http.delete(`${backURL}/admin/activity`+`/${_id}`)
  }
updateActivity(_id:string,params:any){
  console.log(params)
  return this.http.patch(`${backURL}/admin/activity/${_id}`,params).pipe(
    map((res) => {
      // login successful if there's a jwt token in the response
      return res;
    })
  );
  
}

//**********Session Booking Action ********//

  getBooking() {
    return this.http.get(`${backURL}/admin/sessionBooking`, {
      
    });
  }

//**********Therapist Action ********//
  getDoctor() {
    return this.http.get(`${backURL}/therapist/therapist`, {
      
    });
  }

  uploadTherapist(formData){
    this.http.post(`${backURL}/therapist/therapist`, formData)
    .subscribe((res) => {
        console.log('From server', res);
        //this.successMsg = 'Contestant submit successfully';
       
      },
     
    );
  }
  uploadActivity(formData){
    this.http.post(`${backURL}/admin/addActivity`, formData)
    .subscribe((res) => {
        console.log('From server', res);
        //this.successMsg = 'Contestant submit successfully';
       
      },
     
    );
  }
  uploadInstitution(formData){
    this.http.post(`${backURL}/institution/institution`, formData)
    .subscribe((res) => {
        console.log('From server', res);
        //this.successMsg = 'Contestant submit successfully';
       
      },
     
    );
  }
  getInstitution() {
    return this.http.get(`${backURL}/institution/institution`, {
      // headers: {
      //   'x-access-token': this.getAccessToken(),
      // }
    });
  }
  
//********** Action ********//
  getAppointment() {
    return this.http.get(`${backURL}/admin/appointment`, {
      // headers: {
      //   'x-access-token': this.getAccessToken(),
      // }
    });
  }





}
