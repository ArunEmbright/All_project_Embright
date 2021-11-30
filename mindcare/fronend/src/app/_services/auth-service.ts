import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { User } from '../_models/auth-model';
import {  HttpHeaders } from '@angular/common/http'
import { HttpClient,HttpResponse } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { WebRequestService } from './Web-RequestURL';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

const backURL = `${environment.apiURL}`;

@Injectable({ providedIn: 'root' })
export class authService {
  selectedUser: User[] = [];
  data: any;

  

  Mail:string;
  selectedListId: string;
  constructor(
    private http: HttpClient,
    private webService: WebRequestService,
    private router: Router
  ) {
    
  }
   headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-access-token','/')
  
 getNewAccessToken() {
    return this.http
      .get(`${backURL}/auth/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      );
  }

  register(user: User) {
    return this.http.post<any>(`${backURL}/auth/register`, user);
  }

  accoutnActivation(token: any){
    return this.http.post(`${backURL}/auth/activate/${token}`,{
      observe: 'body'
    })
  }

  // getUsers() {
  //   this.http.get<{selectedUser: User[]}>(`${backURL}/auth/user`).pipe(
  //     map((profileData)=>{
  //       return profileData.selectedUser
  //     })
  //   ).subscribe((selectedUser)=>{
  //     this.selectedUser = selectedUser
  //   })
  // }

  getUsers(){
  return this.http.get(`${backURL}/auth/user`, {
    headers: {
      'x-access-token': this.getAccessToken(),

    }
  }) 
}

upload(file: File) {
  const formData: FormData = new FormData();

  formData.append('file', file);

  return this.http.patch(`${backURL}/auth/upload_avatar`,formData,{
    headers:{
      'x-access-token':this.getAccessToken(),
     }
  })
 
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    console.error(error); // log to console instead

     return of(result as T);
    };
  }

 
  forgotPassword(email:string){
    this.Mail =email;
    this.data={
      email:email
    }
    return this.http.post(`${backURL}/auth/sendOTP`,this.data)
  }

  OTPVarification(otp:string){
    this.data={
      otp:otp
    }
    return this.http.post(`${backURL}/auth/confirmOTP`, this.data,{
      observe:'response'
    })
   
  }

  UpdatePassword(email:string, password:string){
    this.data={
      password:password,
      email:this.Mail
    }
    return this.http.put(`${backURL}/auth/updatePassword`, this.data)

  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        console.log('Successfully logged!');
        this.selectedListId = res.body._id;
        console.log('id', res.body._id);
      })
    );
  }
  isAuthenticated() {
    let token = localStorage.getItem('x-access-token');
    if (token) {
      return true;
    }

    return false;
  }

  logout() {
    this.removeSession();

    this.router.navigate(['/mindcare/auth/login']);
  }
  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  
  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  public removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

 
}
