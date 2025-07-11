import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {IonButton,IonContent,IonHeader, IonIcon,IonInput,IonItem,IonTitle,IonToolbar} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,IonHeader, IonTitle,IonToolbar, CommonModule,FormsModule,IonButton,IonIcon,IonInput,IonItem,ReactiveFormsModule]})
export class LoginPage {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected typeOfPasswordInput = 'password';
  protected iconOfPasswordInput = 'eye-outline';

  constructor( private router: Router, private auth: AuthService ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  public onTogglePasswordVisibility() {
    if (this.typeOfPasswordInput === 'password') {
      this.iconOfPasswordInput = 'eye-off-outline';
      this.typeOfPasswordInput = 'text';
    } else {
      this.iconOfPasswordInput = 'eye-outline';
      this.typeOfPasswordInput = 'password';
    }
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const payload = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.auth.login(payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/todos', { replaceUrl: true });
      }
    });
  }
}