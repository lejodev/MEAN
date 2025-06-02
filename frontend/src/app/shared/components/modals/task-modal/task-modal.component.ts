import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ITask } from 'src/app/modules/dashboard/interfaces/task.interface';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard/dashboard.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  taskForm!: FormGroup;
  tasks: ITask[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<TaskModalComponent>,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      tags: [''],
      status: ['pending', Validators.required]
    })
  }

  onSubmit(): void {

    if (this.taskForm.invalid) {
      console.error("Form is invalid");
      return;
    }

    const taskData = this.taskForm.value;

    if (taskData.dueDate) {
      taskData.dueDate = new Date(taskData.dueDate).toISOString();
    }

    console.log(taskData);

    this.dashboardService.create(taskData).subscribe({
      error: (err) => {
        console.log("Error creating task:", err);
      }, next: (task) => {
        console.log("Task created successfully:", task);
        this.taskForm.reset();
        this._matDialogRef.close()
      }
    });
  }

  onClickDelete(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to delete this task?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.delete(taskId).subscribe({
          error: (err) => {
            console.error("Error deleting task:", err);
          },
          next: (task) => {
            console.log("Task deleted successfully:", task);
            this.tasks = this.tasks.filter(t => t._id !== taskId);
          }
        });
      }
    });
  }

}
