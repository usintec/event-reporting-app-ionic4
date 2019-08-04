import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.page.html',
  styleUrls: ['./list-event.page.scss'],
})
export class ListEventPage implements OnInit {
  eventList: Event[] = [];
  isLoading: boolean = false;

  constructor(
    private eventService: EventService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  ionViewDidLoad(){
    console.log("form loaded");
    this.getEvents();
  }
  getEvents(pageNo: number = 0){
    this.isLoading = true;
    this.eventService.fetchEvents(pageNo)
      .subscribe((data) => {
        this.isLoading = false;
        if(data.success){
          this.message(data.message);
          this.eventList = data.event.data;
        }else {
          this.message("Empty Data returned")
        }
      },
      error => {
        this.isLoading = false;
        this.message("Operation Failed.Please Try Again");
      });
  }
  getEventsByEventName(){

  }
  getEventByReporterName(){

  }
  getEventByEventDate(){

  }
  async message(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      //position: 'buttom'
    });
    toast.present();
  }
}
