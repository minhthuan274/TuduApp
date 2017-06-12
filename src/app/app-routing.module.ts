import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './components/task/task.component';
import { ListsComponent } from './components/lists/lists.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { LoggedInGuard } from './services/guards/logged-in-guards.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home',         component: HomeComponent },
    { path: 'lists',        component: ListsComponent},
    { path: 'lists/:id',    component: TaskComponent },
    { path: 'profile',      component: ProfileComponent},
    { path: 'signup',       component: SignupComponent},
    { path: 'login',		component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}