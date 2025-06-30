import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonInput, IonItem, IonList, IonButton} from '@ionic/angular/standalone';
import { TodoService } from '../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonList, IonButton]
})
export class CreateTodoPage implements OnInit {
  title: string = '';
  description: string = '';

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit() {}

  createTodo() {
    if (!this.title.trim()) return;
  
    const todo = {
      title: this.title,
      description: this.description,
      completed: false
    };
  
    this.todoService.createTodo(todo).subscribe(() => {
      window.location.href = '/todos'; 
    });
  }
}