import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './components/task/task.component';
import { TaskListsComponent } from './components/task_lists/task_lists.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

import { LoggedInGuard } from './services/guards/logged-in-guards.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home',         component: HomeComponent },
    { path: 'lists',        component: TaskListsComponent, canActivate: [LoggedInGuard]},
    { path: 'lists/:id',    component: TaskComponent },
    { path: 'profile',      component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}