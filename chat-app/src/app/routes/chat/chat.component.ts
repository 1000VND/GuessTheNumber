import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  inputMessage = "";
  messages: any[] = [];
  loggedInUserName = sessionStorage.getItem("user");
  roomName = sessionStorage.getItem("room");
  imageUrl: string = 'assets/man-user-profile-';

  constructor(
    public chatService: ChatService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let random = Math.floor(Math.random() * 3) + 1;
    this.imageUrl = this.imageUrl + random + '.png';

    const user = sessionStorage.getItem('user') ?? '';
    const room = sessionStorage.getItem('room') ?? '';

    if (user && room) {
      this.chatService.joinRoom(user.trim(), room.trim())
        .then(() => {
          this.router.navigate(['/chat']);
        }).catch((err) => {
          console.log(err);
        });
    }

    this.chatService.messagesList$.subscribe(res => {
      this.messages = res;
    });

    this.chatService.connectedUsers$.subscribe();
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
