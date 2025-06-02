import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/modules/dashboard/interfaces/task.interface';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard/dashboard.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = 'Create Task';

  // This is the current date. To ensure duedate is no in the past
  minDate: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: { task: ITask, isEdit: boolean }
  ) {
    this.isEditMode = data?.isEdit || false;
    this.dialogTitle = this.isEditMode ? 'Edit Task' : 'Create Task';
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEditMode && this.data?.task) {
      this.patchFormValues(this.data.task);
    }
  }

  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date < today) {
      console.log(date, today);
      
      return { pastDate: 'Due date cannot be in the past' };
    }
    return null;
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: [new Date(),[ Validators.required, this.dateValidator]],
      tags: ['']
    });
  }

  private patchFormValues(task: ITask): void {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: new Date(task.dueDate),
      tags: task.tags?.join(', ') || ''
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;
    const taskData: Partial<ITask> = {
      ...formValue,
      dueDate: new Date(formValue.dueDate).toISOString(),
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : []
    };

    if (this.isEditMode && this.data?.task._id) {
      this.updateTask(this.data.task._id, taskData);
    } else {
      this.createTask(taskData);
    }
  }

  private createTask(taskData: Partial<ITask>): void {
    this.dashboardService.create(taskData).subscribe({
      next: (task) => {
        console.log('Task created successfully:', task);
        this.dialogRef.close(task);
      },
      error: (err) => {
        console.error('Error creating task:', err);
      }
    });
  }

  private updateTask(taskId: string, taskData: Partial<ITask>): void {
    this.dashboardService.update(taskId, taskData).subscribe({
      next: (task) => {
        console.log('Task updated successfully:', task);
        this.dialogRef.close(task);
      },
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
  }
}
