import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'

const backURL = `${environment.apiURL}`

@Injectable({providedIn: 'root'})

export class WebRequestService {

    

    constructor(private http: HttpClient) { }

    get(uri: string) {
        return this.http.get(`${backURL}/${uri}`);
      }
    
    
      post(uri: string, payload: Object) {
        return this.http.post(`${backURL}/${uri}`, payload);
      }
    
      patch(uri: string, payload: Object) {
        return this.http.patch(`${backURL}/${uri}`, payload);
      }
    
      delete(uri: string) {
        return this.http.delete(`${backURL}/${uri}`);
      }
      therapistLogin(email: string, password: string) {
        return this.http.post(`${backURL}/therapist/login`, {
          email,
          password
        }, {
            observe: 'response'
          });

        
      }
    
      login(email: string, password: string) {
        return this.http.post(`${backURL}/auth/login`, {
          email,
          password
        }, {
            observe: 'response'
          });

        
      }
    
}