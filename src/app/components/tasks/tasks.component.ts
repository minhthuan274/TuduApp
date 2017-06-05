import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, CanDeactivate } from '@angular/router';

import { Task } from "../../models/task";
import { TaskService } from '../../services/task.service';

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
  loading = true;

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
        .then(tasks => {
          this.toogleLoading();
          this.tasks = tasks;
          console.log(this.tasks);
        })
        .catch(error => this.error = error);
  }

  deleteTask(task: Task, event: Event) {
    event.stopPropagation();
    this.taskService
        .deleteTask(task)
        .then(() => {
          this.tasks = this.tasks.filter(v => v.id !== task.id);
        })
        .catch(error => this.error = error);
  }
  addTask() {
    this.toogleLoading();
    this.taskService
        .addTask(this.newTask)
        .then((res) => {
          this.toogleLoading();
          this.newTask.id = JSON.parse(res.text()).id;
          this.tasks.push(this.newTask);
          this.newTask = new Task();
        })
  }

  changeToEdit(task: Task, event: any) {
    event.stopPropagation();
    this.taskEditing = task.id;
  }

  editTask(text: string, task: Task, event: any) {
    event.stopPropagation();
    task.title = text;
    this.taskService
        .updateTask(task)
        .then(() => {
          this.tasks.find(t => t.id === task.id).title = text;
          this.revertEdit();
        })
  }

  revertEdit() {
    this.taskEditing = -1;
  }

  goTodo(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  toogleLoading() {
    this.loading = !this.loading;
  }


}
