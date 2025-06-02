import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ITask } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['title', 'status', 'priority', 'dueDate', 'tags', 'actions'];
  dataSource = new MatTableDataSource<ITask>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('newTaskModal') newTaskModalTemplate!: TemplateRef<any>;


  tasks: ITask[] = [];



  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.dashboardService.getAllTasks().subscribe({
      error: (err) => console.error('Error fetching tasks:', err)
    });

    this.dashboardService.tasks$.subscribe(tasks => {
      console.log(tasks);

      this.dataSource.data = tasks;
    });
  }



  openCreateTaskModal(): void {

    this.dialog.open(TaskModalComponent,
      { width: '500px' },
    )
  }

  onClickDelete(taskId: string): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '300px',
    data: {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this task?'
    }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.dashboardService.delete(taskId).subscribe({
        error: (err) => {
          console.error("Error deleting task:", err);
        },
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(t => t._id !== taskId);
        }
      });
    }
  });
}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
