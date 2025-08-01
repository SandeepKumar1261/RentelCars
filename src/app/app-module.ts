import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminModule } from './admin/admin-module';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from './auth/auth-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    DashboardModule,
    SharedModule,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
