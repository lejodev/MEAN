import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ITask } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('newTaskModal') newTaskModalTemplate!: TemplateRef<any>;

  tasks: ITask[] = [];



  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.dashboardService.tasks$.subscribe(tasks => {
      this.tasks = tasks
    });

    this.dashboardService.getAllTasks().subscribe({
      error: (err) => {
        console.error("Error fetching tasks:", err);
      }
      // , next: (tasks) => {
      //   console.log("Tasks fetched successffgully:", tasks);
      //   this.tasks = tasks;
      // }
    })
    this.dashboardService.getAllTasks();
  }

  openCreateTaskModal(): void {

    this.dialog.open(TaskModalComponent,
      { width: '500px' },
    )
  }

  onClickDelete(taskId: string): void {
    this.dashboardService.delete(taskId).subscribe({
      error: (err) => {
        console.error("Error deleting task:", err);
      }, next: (task) => {
        console.log("Task deleted successfully:", task);
        this.tasks = this.tasks.filter(t => t._id !== taskId);
      }
    });
  }


}
