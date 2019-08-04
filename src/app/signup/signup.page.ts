import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading: boolean = false;
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  
  initializeForm(){
    this.userForm = new FormGroup({
      'surname': new FormControl('', Validators.maxLength(100)),
      'othername': new FormControl('', Validators.maxLength(100)),
      'gender': new FormControl('', Validators.maxLength(10)),
      'email': new FormControl('',Validators.maxLength(100)),
      'password': new FormControl('', Validators.maxLength(100)),
      'state': new FormControl('', Validators.maxLength(50)),
      'phone_no': new FormControl('', Validators.maxLength(20)),
      'address': new FormControl('', Validators.maxLength(200)),
      //'role': new FormControl('', Validators.maxLength(50))
    });
  }
  registerUser(){
    let formData = this.userForm.value;
    this.isLoading = true;
    this.userService.storeUser(new User('',formData.surname,formData.othername,formData.gender,formData.email,formData.password,
      formData.state,formData.phone_no,formData.address,'reporter')).subscribe((data) => {
        this.isLoading = false;
        this.message(data.message);
        console.log(data);
      },
      error => {
        this.message("Operation failed. Please try again.");
        console.log(error.message);
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
