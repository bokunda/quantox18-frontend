import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  name = new FormControl('', [Validators.required, Validators.maxLength(10)] );
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]);
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\ \.\!\?\#\u0110\u0111\u0106\u0107\u010c\u010d\u017d\u017e\u0160\u0161]{1,}')]);
  passwordConfirm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\ \.\!\?\#\u0110\u0111\u0106\u0107\u010c\u010d\u017d\u017e\u0160\u0161]{1,}')]);

  constructor(
    public userService: UserService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(): void
  {
    if(this.name.valid && this.password.valid && this.password.value == this.passwordConfirm.value && this.email.valid)
    {
      let user: User = new User();

      user.name = this.name.value;
      user.email = this.email.value;
      user.password = this.password.value;
      user.passwordConfirm = this.passwordConfirm.value;

      this.userService.registerUser(user).subscribe(answer =>
        {
          if(answer['access_token'] != null)
          {
            this.authService.signIn(answer);
          }
        },
        error => {
          console.log('ERROR: ' + JSON.stringify(error));
        });
    }
  }
}
