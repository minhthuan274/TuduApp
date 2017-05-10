import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full'},
    { path: 'tasks',    component: TasksComponent },
    { path: 'todo/:id', component: TodoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}