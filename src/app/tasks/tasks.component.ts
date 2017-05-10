import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Task } from '../task';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TodoService]
})
export class TasksComponent implements OnInit {

  newTask: Task = new Task();
  form: FormGroup;

  constructor(
    private router: Router,
    private todoService: TodoService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      newTaskTitle: ['',
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }

  ngOnInit() {
  }

  addTask() {
    this.todoService.addTask(this.newTask);
    this.newTask = new Task();
  }

  goTodo(id: number) {
    this.router.navigate(['/todo', id]);
  }

  get tasks() {
    return this.todoService.getAllTasks();
  }

}
