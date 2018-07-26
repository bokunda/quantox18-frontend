import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import { EMPTY } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private singed: boolean;
  @Output() isLogged = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  signIn(answer: any): void {
    this.singed = true;

    localStorage.setItem('access_token', answer['access_token']);
    localStorage.setItem('username', answer['data'].name);
    localStorage.setItem('id', answer['data'].id);
    window.location.replace('/home');
  }

  isSigned(): boolean {
    localStorage.getItem('access_token') != null ? this.singed = true : this.singed = false;
    this.isLogged.emit(this.singed);
    return this.singed;
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client error
      console.log('ERROR: ', err.error.message);
    }

    return EMPTY;
  }

  logout()
  {
    localStorage.clear();
    //this.router.navigate(['/home']);
    window.location.replace('/home');
  }
}
