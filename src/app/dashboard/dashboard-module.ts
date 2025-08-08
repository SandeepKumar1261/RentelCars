import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard/dashboard';
import { Buy } from './buy/buy';
import { ViewCar } from './view-car/view-car';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [Dashboard, Buy, ViewCar],
  imports: [CommonModule, RouterLink],
})
export class DashboardModule {}
