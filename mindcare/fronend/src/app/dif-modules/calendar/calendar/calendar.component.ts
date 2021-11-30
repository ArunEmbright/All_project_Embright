import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { CalendarService } from 'src/app/_services/calendar/calendar-services';
import { EventDiologComponent } from '../event-diolog/event-diolog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  
  setView(view: CalendarView) {
    this.view = view;
  }
  events: CalendarEvent[] = [];
  constructor(private dialog: MatDialog, private calendarService:CalendarService ) { }

  ngOnInit(): void {
    this.loadEvents()
  }


  addEvent(datetime:any){
    let date =
    `${datetime.getFullYear()}` +
    `-${('0' + (datetime.getMonth() + 1)).slice(-2)}` +
    `-${('0' + datetime.getDate()).slice(-2)}`;

    let time = `${('12' + datetime.getHours()).slice(-2)}:${(
      '12' + datetime.getMinutes()
    ).slice(-2)}`;


    const dialogRef = this.dialog.open(EventDiologComponent, {
      data: {
        date: date,
        time: time,
      },
    });
    dialogRef.afterClosed().subscribe((data)=>{
      if(data && (data.event =='add' || data.event =='404')){
        this.loadEvents();
      }
    })
  }

  loadEvents(){
    this.calendarService.getEvents().subscribe((receivedEvents: any)=>{
      let eventArray: { start: Date; title: any; }[] = [];
      receivedEvents.map((e:any)=>{
        let eventObj={
          start: new Date(`${e.date}:${e.time}`),
          title: e.title,
        };
        eventArray.push(eventObj)
      });
      this.events = eventArray;
    })
  }
}
