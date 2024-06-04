import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  inputMessage = "";
  messages: any[] = [];
  loggedInUserName = sessionStorage.getItem("user");
  roomName = sessionStorage.getItem("room");

  constructor(
    public chatService: ChatService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chatService.messages$.subscribe(res => {
      this.messages = res;
    });

    this.chatService.connectedUsers$.subscribe()
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.chatService.sendMessage(this.inputMessage)
      .then(() => {
        this.inputMessage = '';
      }).catch((err) => {
        this.toastr.error(err, 'Có lỗi xảy ra');
      });
  }

  leaveChat() {
    this.chatService.leaveChat()
      .then(() => {
        this.router.navigate(['/welcome']);
        setTimeout(() => {
          location.reload();
        }, 0);
      }).catch((err) => {
        this.toastr.error(err, 'Có lỗi xảy ra');
      })
  }

}
