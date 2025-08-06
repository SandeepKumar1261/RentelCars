import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard/dashboard';
import { Buy } from './buy/buy';
import { ViewCar } from './view-car/view-car';

@NgModule({
  declarations: [Dashboard, Buy, ViewCar],
  imports: [CommonModule],
})
export class DashboardModule {}
