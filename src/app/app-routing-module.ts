import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin/admin/admin';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';

const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
