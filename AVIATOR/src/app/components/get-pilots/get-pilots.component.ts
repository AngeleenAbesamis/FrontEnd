import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { pilot } from 'src/app/models/pilot';
import { user } from 'src/app/models/user';
import { PilotRESTService } from 'src/app/services/pilot-rest.service';
import { UserRESTService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-get-pilots',
  templateUrl: './get-pilots.component.html',
  styleUrls: ['./get-pilots.component.css']
})
export class GetPilotsComponent implements OnInit {
  producer: user;
  pilots: pilot[] = [];
  constructor(public auth: AuthService, private userService: UserRESTService, private pilotService: PilotRESTService, private router: Router) {
    this.producer = 
    {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumb: 0,
      pilots: []
    }
  }

  ngOnInit(): void {this.auth.user$.subscribe (
    user =>
    this.userService.GetUserByEmail(user.email).subscribe
    (
      foundUser =>
      {this.producer = foundUser;        
        this.pilotService.GetPilotsByProducerID(foundUser.id).subscribe
        (
          (result) => {this.pilots = result}
        )}
    ));
  }
  GetPilot(id: number) {
  this.router.navigate(['pilot-details'], {queryParams: {pilot: id}});
  }
}
