import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthService
  ) { }

  users: User[];
  signed = false;

  ngOnInit() {

    this.userService.getAllUsers().subscribe(answer =>
    {
      this.users = answer['data'];
    });

    this.signed = this.authService.isSigned();

  }

}
