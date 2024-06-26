import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomIdRoom: string = '';
  username: string = '';
  searchIdRoom: string = '';
  data: { username: string, idRoom: string } = { username: '', idRoom: '' };
  router = inject(Router);

  constructor(
    private toastr: ToastrService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRandomNumbers();
  }

  getRandomNumbers() {
    let randomNumbers: number[] = [];
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * 10);
      randomNumbers.push(randomNumber);
    }
    this.randomIdRoom = randomNumbers.join('');
  }

  createRoom() {
    if (!this.username) {
      this.toastr.error('Tên hiển thị không được để trống', 'Lỗi', {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
      });
      return;
    }

    this.data.username = this.username;
    this.data.idRoom = this.randomIdRoom;

    this.joinRoom(this.data.username.trim(), this.data.idRoom.trim())
  }

  searchRoom(event: any) {
    if (!this.username) {
      this.toastr.error('Tên hiển thị không được để trống', 'Lỗi', {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
      });
      return;
    } else if (!event) {
      this.toastr.error('ID phòng không được để trống', 'Lỗi', {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
      });
      return;
    }

    this.searchIdRoom = event;
    this.joinRoom(this.username, this.searchIdRoom)

  }

  joinRoom(user: string, room: string) {
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("room", room);
    this.chatService.joinRoom(user.trim(), room.trim())
      .then(() => {
        this.router.navigate(['/chat']);
      }).catch((err) => {
        console.log(err);
      });
  }

}
