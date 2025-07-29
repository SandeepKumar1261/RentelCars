import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@NgModule({
  declarations: [Signup, Login],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  exports: [Signup, Login],
})
export class AuthModule {}
