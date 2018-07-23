import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  registerUser(user: User): Observable<any>
  {
    console.log(user);
    let url = environment.serverUrl + 'register';

    let header = new HttpHeaders();
    header.set('Accept', 'application/json');

    let fd = new FormData();
    fd.append('name', user.name);
    fd.append('email', user.email);
    fd.append('password', user.password);
    fd.append('passwordConfirm', user.passwordConfirm);

    return this.http.post(url, fd, {headers: header});

  }

  signInUser(user: User): Observable<any>
  {
    let url = environment.serverUrl + 'login';

    let header = new HttpHeaders();
    header.set('Accept', 'application/json');

    let fd = new FormData();
    fd.append('email', user.email);
    fd.append('password', user.password);

    return this.http.post(url, fd, {headers: header});
  }

  getAllUsers(): Observable<any>
  {
    let url = environment.serverUrl + 'users';

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.get(url, {headers: header});
  }
}
