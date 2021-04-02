import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pilot } from 'src/app/models/pilot';
import { PilotRESTService } from 'src/app/services/pilot-rest.service';
declare var CacheEngine: any;
@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: ['./pilot-details.component.css']
})
export class PilotDetailsComponent implements OnInit {
  pilot: pilot;
  constructor(private pilotService: PilotRESTService, private route: ActivatedRoute) {
  this.pilot =
  {
    id: 0,
    Producer:
    {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumb: 0,
      id: 0,
      pilots: []
    },
    producerID: 0,
    pilotName: '',
    pilotDescription: '',
  }
  }

  ngOnInit(): void {
  this.route.queryParams.subscribe(
    params =>{
      this.pilotService.GetPilot(params.pilot).subscribe(
        foundPilot => { this.pilot = foundPilot; CacheEngine.purge("all"); CacheEngine.pilot = this.pilot.id;}
    )}
  )
  }

}
