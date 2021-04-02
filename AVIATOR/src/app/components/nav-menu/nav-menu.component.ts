import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { user } from 'src/app/models/user';
import {UserRESTService} from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  userModel: user;
  constructor(public auth:AuthService,private userService: UserRESTService) {
  this.userModel =
  {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    email: 'jawn',
    phoneNumb: 0,
    pilots: []
    }
  }
  ngOnInit(): void {
    this.auth.user$.subscribe (
      user =>
      this.userService.GetUserByEmail(user.email).subscribe(
        foundUser => {
          this.userModel = foundUser;
        }
      )
    )
  }
}
