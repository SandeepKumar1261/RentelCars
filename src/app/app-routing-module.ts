import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin/admin/admin';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard/dashboard';

const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin },
  { path: '', component: Dashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
