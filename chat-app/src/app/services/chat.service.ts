import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  hubConnection: signalR.HubConnection;
  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      // .withUrl('http://26.14.128.17:5001/chathub')
      .withUrl('http://localhost:5001/chathub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch(err => console.error(err));
  }

  public async start() {
    try {
      await this.hubConnection.start();
      console.log("Connection is established!")
    } catch (error) {
      console.log(error);
    }
  }

  // public sendMessage(user?: string, message?: string): void {
  //   this.hubConnection.invoke('SendMessage', user, message)
  //     .catch(err => console.error(err));
  // }

  // public receiveMessage(callback: (user: string, message: string) => void): void {
  //   this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
  //     callback(user, message);
  //   });
  // }

  //Join Room
  public async joinRoom(user: string, room: string) {
    return this.hubConnection.invoke("JoinRoom", { user, room })
  }

  //Send Messages
  public async sendMessage(message: string) {
    return this.hubConnection.invoke("SendMessage", message)
  }

  //Leave
  public async leaveChat() {
    return this.hubConnection.stop();
  }
}