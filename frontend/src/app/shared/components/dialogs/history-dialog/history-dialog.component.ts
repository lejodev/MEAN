import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/modules/dashboard/interfaces/task.interface';

@Component({
  selector: 'app-task-history',
  template: `
    <h2 mat-dialog-title>Task History: {{data.task.title}}</h2>
    <mat-dialog-content>
      <mat-list>
        <mat-list-item *ngFor="let history of data.task.history">
          <div mat-line>{{history.field}}</div>
          <div mat-line>{{history.changedAt| date:'medium'}}</div>
          <div mat-line>{{history.field}}</div>
          <div mat-line>Old Value: {{history.oldValue}}</div>
          <div mat-line>New Value: {{history.newValue}}</div>
        </mat-list-item>
      </mat-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class HistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: ITask }) {
    console.log('Task History:', data.task.history);
    
  }
}