import { Injectable } from '@angular/core';
import { EventImage } from '../model/event-image';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventImageService {
  activeEventImage: EventImage;
  eventImageList: EventImage[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setActiveEventImage(eventImage: EventImage){
    this.activeEventImage = eventImage;
  }
  getActiveEventImage(){
    return this.activeEventImage
  }
  setEventImageList(eventsImage: EventImage[]){
    this.eventImageList = eventsImage;
  }
  getEventImageList(){
    return this.eventImageList.slice();
  }
  storeEventImage(){
    return this.http.get<any>(this.authService.getDomain() + 
        'register-event-image').pipe(map((response) =>response));
  }
  fetchEventImageById(eventImageId: string){
    return this.http.get<any>(this.authService.getDomain() + 
        'get-event-image-by-id/' + eventImageId).pipe(map((response) =>response));
  }
}
