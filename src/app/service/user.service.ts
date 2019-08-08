import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private activeUser: User;
  private users: User[] = [];
  
  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private nativeStorage: Storage) { }
  setUserStorage(){
    return this.nativeStorage.set('user', this.activeUser);
}
getUserStorage(){
    return this.nativeStorage.get('user');
}
    setActiveUser(user: User){
        this.activeUser = user;
    }
    setUsers(users: User[]){
        this.users = users
    }
    getActiveUser(){
        return this.activeUser;
    }
    getUsers(){
        return this.users.slice();
    }
    storeUser(user: User)
  {
      return this.http.post<any>(this.authService.getDomain() + 'register?token=' + this.authService.getActiveToken(), 
      user).pipe(map((response) =>response));
  }
    fetchActiveUser(){
        return this.http.get<any>(this.authService.getDomain() + 'user?token=' + this.authService.getActiveToken())
        .pipe(map((response) =>response));
    }
    fetchUsers(pageNo: number){
        return this.http.get<any>(this.authService.getDomain() + 'users?token=' + 
        this.authService.getActiveToken() + '&page=' + pageNo)
        .pipe(map((response) =>response));
    }
    updatePassWord(userId : any, password : User)
    {
        return this.http.post<any>(this.authService.getDomain() + 
        'change-password/'+ userId, {'password':password.password})
        .pipe(map((response) =>response));
    }
}
