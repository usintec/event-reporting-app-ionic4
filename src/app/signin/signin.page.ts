import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
//import { NetworkService } from '../service/network.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from '../model/user';
import { AuthMonithoringService } from '../service/auth-monithoring.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  isLoading: boolean = false;
  signinForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private authMonitoringService: AuthMonithoringService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm(){
    this.signinForm = new FormGroup({
      'email': new FormControl('', Validators.maxLength(100)),
      'password': new FormControl('', Validators.maxLength(100))
    });
  }
  signin(){
    console.log('signin');
          console.log('internet');
          this.isLoading = true;
          this.authService.signin(this.signinForm.value.email, this.signinForm.value.password)
            .subscribe((data) => {
              this.isLoading = false;
              if(data.error){
                console.log(data.error);
              } else {
                console.log(data);
                let user = new User(data.user.id,data.user.surname,data.user.othername,data.user.gender,data.user.email,
                  '',data.user.state,data.user.phone_no,data.user.address,data.user.role
                );
                this.userService.setActiveUser(user);
                this.authMonitoringService.updateAuthenticationStatus(true);
                this.authService.setActiveToken(data.token);
              }
            },
            error => {
              this.isLoading = false;
              //display error message here
              console.log(error.message);
            })
  }
  async internetNotAvailableMessage() {
    const toast = await this.toastCtrl.create({
      message: 'No Internet Connection.',
      duration: 2000,
      //position: 'buttom'
    });
    toast.present();
  }
}
