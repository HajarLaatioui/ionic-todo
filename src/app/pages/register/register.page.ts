import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { Router, RouterModule } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import {IonButton,IonContent,IonHeader,IonIcon, IonInput, IonItem, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonInput,IonButton, FormsModule,IonIcon,ReactiveFormsModule,RouterModule, 

  ]})

export class RegisterPage {
  isLoading: boolean = false;

  protected registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected typeOfPasswordInput = 'password';
  protected iconOfPasswordInput = 'eye-outline';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
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

  public onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
  
    this.isLoading = true;
  
    const payload = {
      firstname: this.registerForm.value.firstname!,
      lastname: this.registerForm.value.lastname!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };
  
    this.auth.register(payload)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/todos', { replaceUrl: true });
        }
      });
  }
}