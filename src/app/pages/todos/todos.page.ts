import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router'; 
import {IonContent,IonHeader,IonTitle,IonToolbar, IonList,  IonItem, IonLabel, IonButton, IonButtons, IonFab, IonFabButton,IonIcon} from '@ionic/angular/standalone';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [IonContent,IonHeader, IonTitle, IonToolbar, CommonModule,FormsModule,IonList, IonItem, IonLabel, IonButton,IonButtons, IonFab, IonFabButton, IonIcon, RouterModule ]
})
export class TodosPage {
  todos: any[] = [];

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

 
  ionViewWillEnter() {
    this.loadTodos();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        console.log('Fetched todos:', data); 
        this.todos = data;
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      }
    });
  }
}