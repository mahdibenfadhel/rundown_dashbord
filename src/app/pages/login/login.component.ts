import { Component, OnInit, OnDestroy } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email;
  password;
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
  }
  signIn() {
    const cred = {
      email: this.email,
      password: this.password
    };
    this.userService.login(cred).subscribe( res => {
      this.userService.setAuth(res.user, res.accessToken);
      this.router.navigate(['/home']);
    });
  }
  ngOnDestroy() {
  }

}
