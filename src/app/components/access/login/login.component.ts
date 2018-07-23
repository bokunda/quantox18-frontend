import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {User} from '../../../models/User';
import { UserService } from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() afterLogin = new EventEmitter<boolean>();

  signed = false;

  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]);
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\ \.\!\?\#\u0110\u0111\u0106\u0107\u010c\u010d\u017d\u017e\u0160\u0161]{1,}')]);

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

    if(this.authService.isSigned() == true)
    {
      this.signed = true;
      this.router.navigate(['/home']);
    }

  }

  signIn(): void
  {
    if (this.password.valid && this.email.valid)
    {
      let user: User = new User();

      user.email = this.email.value;
      user.password = this.password.value;

      this.userService.signInUser(user).subscribe(
        answer =>
      {
        if(answer['access_token'] != null)
        {
          this.authService.signIn(answer);
          this.afterLogin.emit(true);
        }
      },
        error => {
          console.log('ERROR: ' + JSON.stringify(error));
          this.afterLogin.emit(false);
        });
    }
  }

  afterSignIn(signed: boolean): void
  {
    this.signed = signed;
  }

  afterSingOut(signout: boolean): void
  {
    this.signed = !signout;
  }


}
