import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
   
  ],
})
export class HomePage {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}