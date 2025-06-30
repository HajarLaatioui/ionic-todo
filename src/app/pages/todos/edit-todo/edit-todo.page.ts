import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonList, IonButton]
})
export class EditTodoPage implements OnInit {
  todoId!: number;
  title: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodoById(this.todoId).subscribe({
      next: (todo) => {
        this.title = todo.title;
        this.description = todo.description;
      },
      error: (err) => console.error('Error loading todo:', err)
    });
  }

  updateTodo() {
    const updatedTodo = {
      title: this.title,
      description: this.description
    };

    this.todoService.updateTodo(this.todoId, updatedTodo).subscribe(() => {
      this.router.navigate(['/todos']);
    });
  }
}