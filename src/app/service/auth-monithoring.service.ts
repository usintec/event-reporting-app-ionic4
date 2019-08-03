import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthMonithoringService {
  public authenticationStatus: BehaviorSubject<Boolean>;
  constructor() { 
    this.authenticationStatus = new BehaviorSubject(false);
  }
  updateAuthenticationStatus(isAuthenticated: boolean){
    console.log('Network ', (isAuthenticated == true ? 'Authenticated' : 'Not Authenticated') );
    this.authenticationStatus.next(isAuthenticated);
  }
}
