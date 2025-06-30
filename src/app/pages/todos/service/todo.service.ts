import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private BASE_URL = 'http://95.111.253.41:8000';  

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/todos`);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/todos/${id}`);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/todos/${id}`, data);
  }

  createTodo(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/todos`, data);
  }

  getTodoById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/todos/${id}`);
  }
}