import { Routes } from '@angular/router';
import { loogedGuard } from './core/guards/logged/looged.guard';
import { notLoggedGuard } from './core/guards/notlogged/not-logged.guard';

export const routes: Routes = [
  {path: '', canActivate:[loogedGuard],loadComponent: ()=> import("./core/layouts/auth/auth.component").then(c => c.AuthComponent) , children:[
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: ()=> import("./featurd/pages/login/login.component").then(c => c.LoginComponent)},
    {path: 'register', loadComponent: ()=> import("./featurd/pages/register/register.component").then(c => c.RegisterComponent)}
  ]},
  {path: '', canActivate:[notLoggedGuard],loadComponent: ()=> import("./core/layouts/blank/blank.component").then(c => c.BlankComponent) , children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: ()=> import("./featurd/pages/home/home.component").then(c => c.HomeComponent)},
  ]}
];
