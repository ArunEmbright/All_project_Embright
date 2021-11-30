import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

const calendarURL = `${environment.apiURL}`;

@Injectable({providedIn: 'root'})
export class CalendarService {
    constructor( private http:HttpClient) { }
    
    addEvent(event:any){
        return this.http.post<any>(
            `${calendarURL}/calendar/eventAdd`,event, { headers: {
                'x-access-token': this.getAccessToken(),
               
          
              }}
            
        )
    }

    getEvents(){
        return this.http.get(`${calendarURL}/calendar/getEventlist`, {
            headers: {
                'x-access-token': this.getAccessToken(),
               
          
              }
            
        })
    }

    getAccessToken() {
        return localStorage.getItem('x-access-token');
      }
      getRefreshToken() {
        return localStorage.getItem('x-refresh-token');
      }
}