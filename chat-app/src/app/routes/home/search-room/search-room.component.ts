import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.css']
})
export class SearchRoomComponent implements OnInit {
  @Output() saveModal = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter();
  
  searchIdRoom: string = '';

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.saveModal.emit(this.searchIdRoom);
    this.searchIdRoom = '';
  }

  close() {
    this.closeModal.emit();
    this.searchIdRoom = '';
  }

}
