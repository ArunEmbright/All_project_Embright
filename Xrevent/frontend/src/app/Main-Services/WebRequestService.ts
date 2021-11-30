import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly url="http://localhost:3000";

  constructor(private http: HttpClient) {
    this.url="http://localhost:3000"
    }

  get(uri: string) {
    return this.http.get(`${this.url}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.url}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.url}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.url}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.url}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  resgister( 
    firstName: string,
    lastName: string,
    teamName: string,
    phoneNumber: string,
    location: string,
    address:string,
     email: string, 
     password: string) {
    return this.http.post(`${this.url}/users/register`, {
      firstName,
      lastName,
      teamName,
      phoneNumber,
      location,
      address,
      email,
      password,
     
    }, {
        observe: 'response'
      });
  }


}
