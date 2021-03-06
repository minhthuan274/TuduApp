import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ShareListComponent } from './share_list.component';

import { List } from '../../models/list';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {

  newTask: Task = new Task();
  dones: Task[];
  todos: Task[];
  tasks: Task[];
  isReady = false;
  listId: number;
  user_id: number;
  current_user_id: number;


  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.current_user_id = this.authService.getUserData().id;
  }

  getTasks() {
    this.route.params
      .subscribe(params => {
        this.listId = +params.id;
        this.taskService.getTasks(this.listId)
                        .then(res => {
                          this.tasks = res.json().tasks as Task[];
                          this.user_id = res.json().user_id;
                          this.dones = this.tasks.filter(v => v.complete);
                          this.todos = this.tasks.filter(v => !v.complete);                        
                          this.isReady = true;
                        })
      });
  }
  addTask() {
    this.newTask.complete = false;
    this.newTask.list_id = this.listId;
    this.taskService.addTask(this.newTask)
                    .then((res) => {
                      if (res.ok){
                        this.newTask.id = JSON.parse(res.text()).id;
                        this.todos.push(this.newTask);
                      }
                       this.newTask = new Task();
                    })
  }

  markAllDone(){
    this.taskService.markAllDone(this.listId)
        .then(res => {
          if (res.ok) {
            this.todos.map(v => {
              v.complete = true;
              this.dones.push(v);
            });
            this.todos = [];
          }
        })
  }

  removeTask(id: number) {
    this.taskService.removeTask(id)
        .then(() => {
          this.dones = this.dones.filter(v => v.id !== id);
        });
  }

  toggleTaskComplete(Task: Task) {
    this.taskService.toggleTaskComplete(Task.id) 
        .then(() => {
          Task.complete = true;
          this.dones.push(Task);
          this.todos = this.todos.filter(v => v.id !== Task.id);
        })
  }
}
