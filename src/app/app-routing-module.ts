import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin/admin/admin';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { ViewCar } from './dashboard/view-car/view-car';
import { Buy } from './dashboard/buy/buy';

const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin },
  { path: '', component: Dashboard },
  { path: 'car/:id', component: ViewCar },
  { path: 'buy/:id', component: Buy },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
