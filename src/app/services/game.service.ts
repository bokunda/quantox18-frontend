import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  challengeUser(userID: number): Observable<any>
  {
    // userID - id challenged player
    let url = environment.serverUrl + 'games/' + userID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.post(url, [], {headers: header});
  }

  acceptChallenge(gameID: number): Observable<any>
  {
    let url = environment.serverUrl + 'games/' + gameID;

    let bearerHeader: string = 'Bearer ' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.patch(url, [], {headers: header});
  }

  makeMove(gameID: number, location: number): Observable<any>
  {
    let url = environment.serverUrl + 'games/' + gameID + '/take';

    let bearerHeader: string = 'Bearer' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.post(url, location, {headers: header});
  }

  listGames(): Observable<any>
  {
    let url = environment.serverUrl + 'games';

    let bearerHeader: string = 'Bearer' + localStorage.getItem('access_token');
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    return this.http.get(url, {headers: header});

  }

}
