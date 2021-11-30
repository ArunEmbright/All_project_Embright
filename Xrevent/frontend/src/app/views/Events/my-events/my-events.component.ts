import { Component, enableProdMode} from '@angular/core';
import { HttpClient } from '@angular/common/http';


import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-my-events',  
  
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss'],
})
export class MyEventsComponent   {
  dataSource: any;
  currentDate: Date = new Date(2017, 4, 25);

  constructor(private http: HttpClient) {
      this.dataSource = new DataSource({
          store: new CustomStore({
              load: (options) => this.getDatafromGoogle(options, { showDeleted: false })
          })
      });
    }
    
    private getDatafromGoogle(options: any, requestOptions: any) {
      let PUBLIC_KEY = 'AIzaSyBLURQtGOINZpuOcc97dMFfrqOmgUbvgos',
          CALENDAR_ID = 'anureshkv1@gmail.com';
      let dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
              CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

      return this.http.get(dataUrl, requestOptions).toPromise().then((data: any) => data.items);
  }
}

