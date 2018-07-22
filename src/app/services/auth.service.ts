import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private singed: boolean;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  signIn(answer: any): void {
    this.singed = true;

    console.log('auth-service->odgovor ' + answer);

    localStorage.setItem('token', 'test-radi');
    localStorage.setItem('username', 'test-usr');
  }

  isSigned(): boolean {
    if (localStorage.getItem('token') != undefined) {
      this.singed = true;
      return true;
    } else {
      this.singed = false;
      return false;
    }
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client error
      console.log('ERROR: ', err.error.message);
    }

    //return new EmptyObservable();
  }

}
