import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {User} from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]);
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9\ \.\!\?\#\u0110\u0111\u0106\u0107\u010c\u010d\u017d\u017e\u0160\u0161]{1,}')]);

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  signIn(): void
  {
    if (this.password.valid && this.email.valid)
    {
      let user: User = new User();

      user.email = this.email.value;
      user.password = this.password.value;

      console.log('saljem -> email: ' + user.email, 'pass: ' + user.password);

      this.userService.signInUser(user).subscribe(answer =>
      {
        console.log(answer);
      });

    }
  }


}
