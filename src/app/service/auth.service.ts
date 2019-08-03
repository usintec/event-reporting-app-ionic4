import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private activeToken: string;
  private domain: string;

  constructor(private http: HttpClient) { }
  setActiveToken(activeToken: string){
    this.activeToken = activeToken;
  }
  getActiveToken(){
      return this.activeToken;
  }
  setDomain(domain: string){
      this.domain = domain;
  }
  getDomain(){
      return this.domain;
  }

  signin(email: string, password: string){
      return this.http.post<any>( this.domain + 'login', 
        {'email' : email, 'password' : password}).pipe(map((response) =>response));
  }
  signup(user: User){
      return this.http.post( this.domain + 'register', user);
  }
  StoreActiveToken(activeToken: string){
      this.activeToken = activeToken;
  }
}
