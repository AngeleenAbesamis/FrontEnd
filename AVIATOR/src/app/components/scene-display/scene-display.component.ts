import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { sceneDisplay } from '../../models/sceneDisplay';

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css']
})
export class SceneDisplayComponent implements OnInit {

 
  @Input()
  display: sceneDisplay = {
    assetName: "name",
    assetImage:  "https://i.ibb.co/LhkWVY0/0-CA3-D92-E-136-D-438-E-9-F6-F-CD9-FBFF6-DD41.jpg",
    assetDescription : "desc"
  }
  @Output()
  update = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
