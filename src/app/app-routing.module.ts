import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full'},
    { path: 'tasks',    component: TasksComponent },
    { path: 'todo/:id', component: TodoComponent },
    { path: '/*other',  redirectTo: '/tasks'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}