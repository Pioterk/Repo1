import { Injectable, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebSocketMessage } from '../model/web-socket-message';
import { WsMessage } from '../model/ws-message';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { SystemService} from './system.service'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  wsSubject : Subject<WsMessage> = new Subject();
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/message";
  stompClient: any;
  serverURL: string = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  public  webSocketMessages:Array<WsMessage> = new Array(); 
  constructor(private systemService: SystemService) {  

   }
  
  connect() {
    let url = localStorage.getItem("url");
    if (url!=null){
         this.webSocketEndPoint = environment.apiUrl+ url+environment.apiPort+"/ws";
     }
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this.connect();
      }, 5000);
  }

/**
* Send message to sever via web socket
* @param {*} message 
*/
  send(message) {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    let obj  = JSON.parse(message.body);
    // this.webSocketMessages.push(obj);
    this.wsSubject.next(obj);
  }

    
  messageAsObservable() : Subject<WsMessage>{
      return this.wsSubject;
  }


}
