import { Component, OnInit } from '@angular/core';
import { WebsocketService} from './services/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  serverURL: string = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(private websocketService : WebsocketService){

  }
  ngOnInit(): void {
    localStorage.setItem("url", this.serverURL)   
    this.websocketService.connect();
  }
  title = 'Svc reporting tool';
}