import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  activeEvent: Event;
  eventList: Event[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setActiveEvent(event: Event){
    this.activeEvent = event;
  }
  getActiveEvent(){
    return this.activeEvent;
  }
  setEventList(events: Event[]){
    this.eventList = events;
  }
  getEventList(){
    return this.eventList.slice();
  }
  getEventById(id:string){
    const position = this.eventList.findIndex((element) => {
      return element.id == id
    });
    if(position >= 0){
      return this.eventList[position];
    } else{
      return null
    }
  }
  fetchEvents(pageNo: number){
    return this.http.get<any>(this.authService.getDomain() + 
        'events?page=' + pageNo + '&token=' + this.authService.getActiveToken())
        .pipe(map((response) =>response));
  }
  fetchEventsByReporterName(reporterName: string, pageNo: number){
    return this.http.get<any>(this.authService.getDomain() + 
        'get-event-by-reporter-name/' + reporterName + '?page=' + pageNo + '&token=' + this.authService.getActiveToken())
        .pipe(map((response) =>response));
  }
  fetchEventsByReporterId(reporterId: string, pageNo: number){
    return this.http.get<any>(this.authService.getDomain() + 
        'get-event-by-reporter-id/' + reporterId + '?page=' + pageNo + '&token=' + this.authService.getActiveToken())
        .pipe(map((response) =>response));
  }
  storeEvent(event: Event){
    return this.http.post<any>(this.authService.getDomain() + 'register-event/', 
    event).pipe(map((response) =>response));
  }
  fetchEventsByName(eventName: string, pageNo: number){
    return this.http.get<any>(this.authService.getDomain() + 
        'get-event-by-name/' + eventName + '?page=' + pageNo ).pipe(map((response) =>response));
  }
  fetchEventsById(eventId: string){
    return this.http.get<any>(this.authService.getDomain() + 
        'get-event-by-id/' + eventId ).pipe(map((response) =>response));
  }
}
