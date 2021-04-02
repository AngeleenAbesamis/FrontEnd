import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { user } from 'src/app/models/user';
import { UserRESTService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user2update: user;
  constructor(private userService: UserRESTService, public auth: AuthService, private router: Router) {
    this.user2update = 
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
    this.auth.user$.subscribe(
      user=> this.userService.GetUserByEmail(user.email).subscribe
      (
        foundUser => {this.user2update = foundUser;}
      )
    )
  }
  onSubmit(): void{
    this.userService.EditUser(this.user2update).subscribe(
      (user)=>{alert('Information successfully updated!');
    this.router.navigate(['user-info'])},
    (error)=> {alert('Something went wrong :('); console.log(this.user2update)}
    )
    //This is a weird error where I'm not even submitting the form data I want?
  }
}
