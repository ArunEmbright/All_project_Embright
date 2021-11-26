import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { shareReplay } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { WebRequestService } from "./Web-RequestURL";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/auth.models";
import { catchError, map, tap } from "rxjs/operators";
const backURL = `${environment.apiURL}`;


function _window() : any {
  return window;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  data: any;
  Mail: string;
  preValue : any ="0";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  get nativeWindow():any{
    return _window;
  }


  constructor(
    private webService: WebRequestService,
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  getTherapistAccessToken() {
    return this.http 
      .get(`${backURL}/therapist/me/access-token`, { 
        headers: {
          "x-refresh-token": this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get("x-access-token"));
        })
      );
  }
  
  getNewAccessToken() {
    return this.http 
      .get(`${backURL}/auth/me/access-token`, { 
        headers: {
          "x-refresh-token": this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get("x-access-token"));
        })
      );
  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body._id,
          res.headers.get("x-access-token"),
          res.headers.get("x-refresh-token")
        );
        console.log("Successfully logged!");
      })
    );
  }
  TherapistLogin(email: string, password: string) {
    return this.webService.therapistLogin(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body._id,
          
          res.headers.get("x-access-token"),
          res.headers.get("x-refresh-token")
        );
        localStorage.setItem('isAuthorized', JSON.stringify(101));
        console.log("Successfully logged!");
      })
    );
  }
  isAuthenticated() {
    let token = localStorage.getItem("x-access-token");
    if (token) {
      return true;
    }

    return false;
  }

checkScore(userId:string){
  this.data ={
    userId : userId
  }
  return this.http.post<any>(`${backURL}/auth/checkReport`, this.data).pipe(
    map((res) => {
      console.log(res)
      // login successful if there's a jwt token in the response
      return res;
    })
  );
}

 
  register(params: any) {
    return this.http.post<any>(`${backURL}/auth/register`, params).pipe(
      map((res) => {
        // login successful if there's a jwt token in the response
        return res;
      })
    );
  }
  

getList() {
  return this.http.get(`${backURL}/auth/score`, {
    headers: {
      "x-access-token": this.getAccessToken(),
    },
  });
}


  otpVerify(params: any) {
    return this.http.post<any>(`${backURL} + 'auth/verify/otp`, params).pipe(
      map((res) => {
        // login successful if there's a jwt token in the response
        return res;
      })
    );
  }

  getUsers() {
    return this.http.get(`${backURL}/auth/user`, {
      headers: {
        "x-access-token": this.getAccessToken(),
      },
    });
  }

bookAppointment(email:string,patientName:string,firstName:string,lastName:string,relationType:string,age:Number,userId:string){
  this.data = {
    email:email,
    patientName:patientName,
    firstName:firstName,
    lastName:lastName,
    relationType,
    age:age,
    userId:userId
  }
  console.log("Dta",this.data)
  return this.http.post(`${backURL}/auth/freeAppointment`, this.data, {
    headers: {
      "x-access-token": this.getAccessToken(),
    },
    observe: "response",
    
  });
}
sessionBooking(therapistId,therapistName:string,email:string,patientName:string,firstName:string,lastName:string,age:Number,userId:string,mobileNumber:string){
  this.data = {
    therapistId:therapistId,
    therapistName:therapistName,
    email:email,
    patientName:patientName,
    firstName:firstName,
    lastName:lastName,
    mobileNumber:mobileNumber,
    age:age,
    userId:userId
  }
  console.log("session booking",this.data)
  return this.http.post(`${backURL}/auth/sessionBooking`, this.data, {
    headers: {
      "x-access-token": this.getAccessToken(),
    },
    observe: "response",
    
  });
}






  activate(token: any) {
    return this.http.put(`${backURL}/auth/activate/${token}`, {
      observe: "body",
    });
  }
  forgotPassword(email: string) {
    this.Mail = email;
    this.data = {
      email: email,
    };
    return this.http.post(`${backURL}/auth/sendOTP`, this.data);
  }

  OTPVarification(otp: string) {
    this.data = {
      otp: otp,
    };
    return this.http.post(`${backURL}/auth/confirmOTP`, this.data, {
      observe: "response",
    });
  }

  UpdatePassword(email: string, password: string) {
    this.data = {
      password: password,
      email: this.Mail,
    };
    return this.http.put(`${backURL}/auth/updatePassword`, this.data);
  }
  verifyTherapist(email: string, password: string) {
    this.data = {
      password: password,
      email: email,
    };
    return this.http.put(`${backURL}/therapist/updatePassword`, this.data);
  }
  logout() {
    this.removeSession();

    this.router.navigate(["/mindcare/auth/login"]);
  }
  getAccessToken() {
    return localStorage.getItem("x-access-token");
  }

  getRefreshToken() {
    return localStorage.getItem("x-refresh-token");
  }

  getUserId() {
    return localStorage.getItem("user-id");
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem("x-access-token", accessToken);
  }
private TherapistPriority(){
  localStorage.setItem('isAuthorized', JSON.stringify(101));
}
  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
  
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  public removeSession() {
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
    localStorage.clear();
  }

  isAuthorized(): boolean {
    return localStorage.getItem("x-access-token") != null;
  
  }
}
