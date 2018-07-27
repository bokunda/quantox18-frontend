import { Component, OnInit } from '@angular/core';
import {MaterialComponentsModule} from '../../../moduls/material-components.module';
import {MatSnackBar} from '@angular/material';


import { Echo } from 'laravel-echo';
import * as io from 'socket.io-client';
import {Router} from '@angular/router';
import {GameService} from '../../../services/game.service';

import swal from 'sweetalert2'


declare var Echo: any;

declare global {
  interface Window { io: any; }
  interface Window { Echo: any; }
}

window.io = window.io;
window.Echo = window.Echo || {};


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  onMove = 'x';
  onColor = 'blue';

  fields = [];
  gameID;

  playerONE;
  playerTWO;

  temp = -1;
  plays;

  constructor(public gameService: GameService,
              public snackBar: MatSnackBar) {
    window.io = io;
   }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  ngOnInit() {

    this.setFields();

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



    this.gameID = window.location.pathname.split('/')[3];

    this.gameService.gameInfo(this.gameID).subscribe(
      response =>
      {
        this.playerONE = response.challenge.user_one[0].name;
        this.playerTWO = response.challenge.user_two[0].name;
        this.plays = this.playerONE;
      }
    );


    console.log(this.gameID);
    window.Echo.private('game.' + this.gameID)
      .listen('TakeEvent', (data) => {

        if(data.game.takes == undefined) location.reload();

        console.log(data);
        let index = data.game.takes.length - 1;
        let i = data.game.takes[index].pivot.location;

        if(index % 2 == 0) this.onMove = 'x';
        else this.onMove = 'o';


        this.fields[i] = this.onMove;

        this.temp *= -1;

        if(this.temp == 1)
        {
          this.plays = this.playerTWO;
        }
        else
        {
          this.plays = this.playerONE;
        }

        let br = 0;
        if(data.game.winner == null)
        {
          for(let i = 0; i < this.fields.length; i++)
          {
            if(this.fields[i] != ' ') br++;
          }

          if(br == this.fields.length)
          {
            swal(
              'Game over!',
              'It\'t draw!',
              'success'
            )
          }
        }
        else
        {
          swal(
            'Game over!',
            'Winner is ' + data.game.winners.name + '!',
            'success'
          )
        }


        });


  }

  setFields(): void
  {
    for(let i = 0; i < 9; i++)
    {
      this.fields[i] = ' ';
    }
  }

  makeMove(i: number): void
  {
    if(this.fields[i] == ' ')
    {
      this.gameService.makeMove(this.gameID, i).subscribe(response =>
      {
        console.log(response);
        console.log(response.takes[0]);
        console.log(response.challenge.user_one, 'igrac 1');

        if(this.onMove == 'o') this.onMove = 'x';
        else this.onMove = 'o';
        console.log(this.fields[i]);
      },
        error =>
        {
          this.openSnackBar(error.error.message, 'Dismiss');
        }
      );

    }
  }


  public playAgain() {
    this.gameService.newGame(this.gameID).subscribe(res =>
    {
      console.log('new game');
      location.reload();
    });
  }
}
