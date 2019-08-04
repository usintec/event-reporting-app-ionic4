import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.page.html',
  styleUrls: ['./register-event.page.scss'],
})
export class RegisterEventPage implements OnInit {
  isLoading: boolean = false;
  eventForm: FormGroup;
  user: User;
  userId: string = '';
  constructor(
    private eventService: EventService,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.getActiveUser();
    if(this.user){
      this.userId = this.user.id;
    }
  }

  initializeForm(){
    this.eventForm = new FormGroup({
      'reporter_name': new FormControl('', Validators.maxLength(200)),
      'event_name': new FormControl('', Validators.maxLength(200)),
      'location': new FormControl('', Validators.maxLength(200)),
      'description': new FormControl('', Validators.maxLength(500)),
    });
  }
  registerEvent(){
    let formData = this.eventForm.value;
    this.isLoading = true;
    this.eventService.storeEvent(new Event('',formData.reporter_name,
      formData.event_name,formData.loacation,formData.description,this.userId))
      .subscribe((data) => {
        this.isLoading = false;
        if(data.success){
          this.message(data.message);
          this.eventForm.reset();
        }else {
          this.message("Operation Failed.Please try again");
        }
      },
      error => {
        this.isLoading = false;
        this.message("Operation Failed.Please try again");
      });
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
