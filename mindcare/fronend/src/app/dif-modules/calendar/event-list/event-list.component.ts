import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { endOfDay, isFuture, isPast, isToday, startOfDay } from 'date-fns';
import { CalendarService } from 'src/app/_services/calendar/calendar-services';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  presentEvents:any=[];
  pastEvents:any={};
  futureEvents:any={};

  constructor(private calendarService: CalendarService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(){
    this.pastEvents={};
    this.futureEvents={};
    this.calendarService.getEvents().subscribe((receivedEvents:any)=>{
      this.presentEvents = receivedEvents.filter((e:any)=>{
        let eventDate = startOfDay(new Date(e.date));
        return isToday(eventDate)
      });
      this.presentEvents.reverse();
 
      receivedEvents.map((e:any)=>{
        let eventdate = endOfDay(new Date(e.date));
        if(isPast(eventdate)){
          if(this.pastEvents[e.date]){
            this.pastEvents[e.date].push(e);
          }else{
            this.pastEvents[e.date]=[e]
          }
        }
      });
 
      receivedEvents.filter((e:any)=>{
        let eventDate = startOfDay(new Date(e.date));
        if(isFuture(eventDate)){
          if(this.futureEvents[e.date]){
            this.futureEvents[e.date].push(e);
          }else{
            this.futureEvents[e.date]=[e]
          }
        }
      })
    })
  }
  
  trackByIndex(index: any, item: any) {
   return index;
 }
}
