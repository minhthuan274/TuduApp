import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full'},
    { path: 'tasks',    component: TasksComponent },
    { path: 'tasks/:id', component: TodoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}