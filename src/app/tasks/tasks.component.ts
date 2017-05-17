import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Task } from "../task";
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  newTask: Task = new Task();
  form: FormGroup;
  tasks: Task[];
  error: any;
  taskEditing = -1;

  constructor(
    private router: Router,
    private taskService: TaskService,
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
    this.getTasks();
  }

  getTasks() {
    this.taskService
        .getTasks()
        .then(tasks => this.tasks = tasks)
        .catch(error => this.error = error);
  }

  deleteTask(task: Task, event: Event) {
    event.stopPropagation();
    this.taskService
        .deleteTask(task)
        .catch(error => this.error = error);
    this.tasks = this.tasks.filter(v => v.id !== task.id);
  }
  addTask() {
    this.taskService
        .addTask(this.newTask);
    this.getTasks();
    this.newTask = new Task();
  }

  changeToEdit(task: Task, event: any) {
    event.stopPropagation();
    this.taskEditing = task.id;
  }

  editTask(text: string, task: Task, event: any) {
    event.stopPropagation();
    task.title = text;
    this.taskService
        .updateTask(task);
    this.getTasks();
    this.revertEdit();
  }

  revertEdit() {
    this.taskEditing = -1;
  }

  goTodo(id: number) {
    this.router.navigate(['/todo', id]);
  }

}
