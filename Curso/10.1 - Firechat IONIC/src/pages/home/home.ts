import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatService} from '../../app/services/chat.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public chatService: ChatService) {

  }

  salir() {
    this.chatService.logout();
  }

}
