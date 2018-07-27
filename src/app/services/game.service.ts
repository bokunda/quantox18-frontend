import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';

import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  // challengeUser(userID: number): Observable<any>
  // {
  //   // userID - id challenged player
  //   let url = environment.serverUrl + 'games/' + userID;
  //
  //   let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
  //   let header = new HttpHeaders().set('authorization', bearerHeader);
  //   header.set('Accept', 'application/json');
  //
  //   return this.http.post(url, [], {headers: header});
  // }

  acceptChallenge(challengeID: number, userID): Observable<any>
  {
    let url = environment.serverUrl + 'challenges/' + challengeID + '/user/' + userID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.patch(url, [], {headers: header});
  }

  makeMove(gameID: number, location: number): Observable<any>
  {
    console.log(location);
    let url = environment.serverUrl + 'games/' + gameID + '/take';

    let bearerHeader: string = 'Bearer' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    let fd = new FormData();
    fd.append('location', '' + location);

    return this.http.post(url, fd, {headers: header});
  }

  gameInfo(gameID: number): Observable<any>
  {
    let url = environment.serverUrl + 'games/' + gameID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.get(url, {headers: header});
  }

  listGames(): Observable<any>
  {
    let url = environment.serverUrl + 'games';

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.get(url, {headers: header});
  }

  challengePlayer(playerID: number): Observable<any>
  {

    let url = environment.serverUrl + 'challenges/' + playerID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.post(url, {}, {headers: header});
  }

  newGame(gameID: number): Observable<any>
  {
    let url = environment.serverUrl + 'takes/' + gameID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.delete(url, {headers: header});
  }

}
