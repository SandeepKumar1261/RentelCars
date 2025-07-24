import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin/admin';
import { FormsModule } from '@angular/forms';
import { AddEdit } from './add-edit/add-edit';

@NgModule({
  declarations: [Admin, AddEdit],
  imports: [CommonModule, FormsModule],
  exports: [Admin, AddEdit],
})
export class AdminModule {}
