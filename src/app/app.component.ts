import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthMonithoringService } from './service/auth-monithoring.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public role: string;
  public isAuthenticated: boolean = false;
  // public appPages = [
  //   {
  //     title: 'Home',
  //     url: '/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'List',
  //     url: '/list',
  //     icon: 'list'
  //   }
  // ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private router: Router,
    private authMonitorin: AuthMonithoringService
    //private authMonitorin: au
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.setDomain("http://127.0.0.1:8000/api/")//("http://result-computation.codetechweb.com/api/");
      let user: User;

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userService.getUserStorage()
      .then((active) => {
        user = active;
        this.userService.setActiveUser(user);
        if(this.userService.getActiveUser()){
          this.role = this.userService.getActiveUser().role;
        }
      });

      this.authMonitorin.authenticationStatus.subscribe((data) => {
        if(data ||  user != null){
          this.isAuthenticated = true;
          this.role = this.userService.getActiveUser().role;
          this.router.navigateByUrl('/');
        }else {
          console.log("done");
          this.isAuthenticated = false;
          this.role = '';
          this.router.navigateByUrl('/register-event');
        }
      });
      
      // this.networkService.CheckNetworkStatus()
      //   .subscribe((internet) => {
      //     if(internet){
      //       this.internetAvailableMessage();
      //     } else {
      //       this.internetNotAvailableMessage();
      //     }
      //   });
    });
  }
}
