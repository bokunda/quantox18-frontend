import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {GameService} from '../../services/game.service';

import { Echo } from 'laravel-echo';
import * as io from 'socket.io-client';
import {Router} from '@angular/router';


declare var Echo: any;

declare global {
  interface Window { io: any; }
  interface Window { Echo: any; }
}

window.io = window.io;
window.Echo = window.Echo || {};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public gameService: GameService,
    public router: Router
  ) { window.io = io; }

  users = [];
  signed = false;

  challenges = [];

  userGames = [];

  id_Challenge = null;

  myUsername = localStorage.getItem('username');

  ngOnInit() {

    this.signed = this.authService.isSigned();

    let token = 'Bearer ' + localStorage.getItem('access_token');
    window.io = window.io;
    window.Echo = new Echo(
      {
        broadcaster: 'socket.io',
        host: 'http://tictactoe.loc:6002',


            auth:
            {
              headers:
                {
                  'Authorization': token
                }
            }

        });

    // list users

    window.Echo.join('lobby')
      .here((users) => {
        //console.log(users);
        users.forEach(element => {
          if(element.id != localStorage.getItem('id'))
            this.users.push(element);

        });
      })
      .joining((user) => {
        if (this.users.indexOf(user) == -1)
          this.users.push(user);
      })
      .leaving((user) => {
        this.users.splice(this.users.indexOf(user));
      });

    // list challenges
    //
    window.Echo.private('user.' + localStorage.getItem('id'))
      .listen('ChallengeEvent', (data) => {
        console.log(data);

        // for(let i = 0; i < this.challenges.length; i++)
        // {
        //   if((this.challenges[i].player_one != data.player_one && this.challenges[i].player_two != data.player_two) || (this.challenges[i].player_one != data.player_two && this.challenges[i].player_two != data.player_one))
        //   {
        //     this.challenges.push(data.challenge);
        //   }
        // }

        this.challenges.push(data.challenge);

        console.log('usr: ' + localStorage.getItem('username'));

      });

  }

  challengePlayer(userID: number) {

    this.gameService.challengePlayer(userID).subscribe(response => {
          console.log(response);
          this.userGames.push(response);
          this.id_Challenge = response.id;

      window.Echo.private('challenge.' + this.id_Challenge)
        .listen('GameEvent', (data1) => {
          console.log('123456');
          console.log(data1.game.id);

          //this.router.navigate(['game', 'play', data1.game.id]);

          window.location.replace('' + window.location.href + '/play/' + data1.game.id);
          //console.log(window.location.href + '/play/1 ');
          //window.location = window.location.href + '/play/' + data1.game.id;

        });

          console.log('ID CHALLENGE-a', this.id_Challenge);
      }
    );
  }

  acceptChallange(challangeID: number)
  {
    this.gameService.acceptChallenge(challangeID, localStorage.getItem('id')).subscribe(response => {
      console.log('prihvatio', response);
      //window.location = window.location.href + '/play/' + data1.game.id;
      //this.router.navigate(['game', 'play', response.id]);

      window.location.replace('' + window.location.href + '/play/' + response.id);

    });

    this.id_Challenge = challangeID;
  }

  getNameById(userID: number): string
  {
    for(let i = 0; i < this.users.length; i++)
    {
      if(this.users[i].id == userID)
      {
        return this.users[i].user;
      }
    }

    return null;
  }

}
