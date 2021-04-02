import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { user } from 'src/app/models/user';
import { UserRESTService } from 'src/app/services/user-rest.service';
import { pilot } from 'src/app/models/pilot';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userModel: user;
  constructor(public auth: AuthService, private userService: UserRESTService) {

    this.userModel = 
    {
      userName: '',
      id: 0,
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
      this.userService.GetUserByEmail(user.email).subscribe
      (
        foundUser =>
        {
          this.userModel = foundUser;
        }
      )
    )
  }
}