import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  onMove = 'x';
  onColor = 'blue';

  setedMove = false;

  boardField1 = 0;
  boardField2 = 0;
  boardField3 = 0;
  boardField4 = 0;
  boardField5 = 0;
  boardField6 = 0;
  boardField7 = 0;
  boardField8 = 0;
  boardField9 = 0;


  constructor() {
   }

  ngOnInit() {
  }

  public makeMove(b) {
    if(b == 1){
      this.boardField1 = 1;
    }
    if(b == 2){
      this.boardField2 = 2;
    }
    if(b == 3){
      this.boardField3 = 3;
    }
    if(b == 4){
      this.boardField4 = 4;
    }
    if(b == 5){
      this.boardField5 = 5;
    }
    if(b == 6){
      this.boardField6 = 6;
    }
    if(b == 7){
      this.boardField7 = 7;
    }
    if(b == 8){
      this.boardField8 = 8;
    }
    if(b == 9){
      this.boardField9 = 9;
    }

    if (this.onMove == 'x') {
      this.onMove = 'o';
      this.onColor = 'pink';
    }
    else {
      this.onMove = 'x';
      this.onColor = 'blue';
    }
  }

}