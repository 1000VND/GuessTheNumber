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

  public messagesList$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();

    this.hubConnection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {
      if (!messageTime) {
        const userBot = user;
        user = 'Bot';
        messageTime = message;
        message = `Chào mừng ${userBot} đến với phòng chat !`;
        
      }
      this.messages = [...this.messages, { user, message, messageTime }];
      this.messagesList$.next(this.messages);
    });

    this.hubConnection.on("ConnectedUser", (users: any) => {
      this.connectedUsers$.next(users);
    });

  }

  async start() {
    try {
      await this.hubConnection.start();
    } catch (error) {
      console.log(error);
    }
  }

  public async joinRoom(user: string, room: string) {
    return this.hubConnection.invoke('JoinRoom', { user, room });
  }

  public async sendMessage(message: string) {
    return this.hubConnection.invoke("SendMessage", message)
  }

  public async leaveChat() {
    return this.hubConnection.stop();
  }
}
