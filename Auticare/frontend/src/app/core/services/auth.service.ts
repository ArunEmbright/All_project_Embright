import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { User, User2 } from '../models/auth.models';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User2;

    constructor(private http:HttpClient) {
    }
signup(body:any)
{
    return  this.http.post('http://localhost:4001/api/auth/register',body,{
        observe:'body',
        headers:new HttpHeaders().append('Content-Type','application/json')
    })
}

isAuthorized() {
    return !!this.user;
}

hasRole(role: Role) {
    return this.isAuthorized() && this.user.role === role;
}

login(role: Role) {

  this.user = {  role: role,};
}

logout() {
  this.user = null;
}
   
}

