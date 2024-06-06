import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    // .withUrl('http://26.14.128.17:5001/chathub')
    // .withUrl('http://26.113.177.85:5001/chathub')
    .withUrl('http://localhost:5001/chathub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messagesTest = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();

    this.hubConnection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
      this.messages = [...this.messages, { user, message, messageTime }];
      this.messagesTest.next(this.messages);
    });

    this.hubConnection.on("ConnectedUser", (users: any) => {
      this.connectedUsers$.next(users);
    });

  }

  async start() {
    try {
      await this.hubConnection.start();
      console.log("Kết nối SignalR thành công");
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
