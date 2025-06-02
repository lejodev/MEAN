import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';





@NgModule({
  declarations: [
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ], exports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class SharedModule { }
