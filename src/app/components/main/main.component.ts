import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  signed = false;
  @Output() afterLogout = new EventEmitter<boolean>();

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    this.signed = this.authService.isSigned();
  }

  logout(): void
  {
    this.authService.logout();
    this.afterLogout.emit(true);
  }
}
