import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {GameService} from '../../services/game.service';

import { Echo } from 'laravel-echo';
import * as io from 'socket.io-client';


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
  ) { window.io = io; }

  users = [];
  signed = false;

  userGames = [];


  ngOnInit() {

    // this.userService.getAllUsers().subscribe(answer =>
    // {
    //   this.users = answer['data'];
    // });

    this.signed = this.authService.isSigned();

    this.listUserGames(14);

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


    //window.Echo.channel('lobby').listen('GameEvent', () => { console.log('data'); });

    // let chanel = Echo.join('lobby');
    //
    // chanel.here((users) => {
    //   console.log(users);
    // });
    //   users.forEach(el => {
    //     this.users.push(el)
    //   })
    // }).joining((user) => {
    //   if (this.users.indexOf(user) == -1) {
    //     this.users.push(user)
    //   }
    // }).leaving((user) => {
    //   this.users.splice(this.users.indexOf(user), 1)
    // }).listen('NewMessageEvent', (event) => {
    //   this.messages.unshift(event.message)
    //   this.scrollTop()
    // })

    owindow.Echo.private('game.4')
    // .here((users)=>{
    //    console.log(users);
    //   users.forEach(element => {
    //     this.users.push(element);
    //
    //   });
    // })
    //   .joining((user)=>{
    //   if (this.users.indexOf(user)==-1)
    //     this.users.push(user);
    // })
    //   .leaving((user)=>{
    //   this.users.splice(this.users.indexOf(user));
    // })
      .listen('GameEvent', (data) => {
        console.log('From laravel echo: ', data);
      });


  }

  challengePlayer(userID: number) {
    this.gameService.challengeUser(userID).subscribe(response => {
          console.log(response);
      }
    );
  }

  listUserGames(userID: number) {
    // this.gameService.listGames().subscribe(response =>
    // {
    //   console.log('response', response);
    //   let array = response.data;
    //
    //   for(let i = 0; i < array.length; i++)
    //   {
    //     if((array[i].challenge.data.user_one.data[0].name == localStorage.getItem('username') || array[i].challenge.data.user_two.data[0].name) && array[i].started != 1)
    //     {
    //
    //       let opponent;
    //       array[i].user_one['data'][0].name == localStorage.getItem('username') ? opponent = array[i].user_one['data'][0].name : opponent = array[i].user_two['data'][0].name;
    //
    //       this.userGames.push({'game_id' : 1, 'opponent' : opponent, 'opponent_id' : 1});
    //       console.log(this.userGames);
    //     }
    //   }
    //
    // });
  }



}
