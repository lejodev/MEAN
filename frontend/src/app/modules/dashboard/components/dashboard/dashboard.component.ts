import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ITask } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { HistoryDialogComponent } from 'src/app/shared/components/dialogs/history-dialog/history-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'status', 'priority', 'dueDate', 'tags', 'actions'];
  dataSource = new MatTableDataSource<ITask>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('newTaskModal') HistoryDialogComponent!: TemplateRef<any>;


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

    this.dataSource.filterPredicate = (data: ITask, filter: string) => {
      return data.title.toLowerCase().includes(filter);
    };
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showTaskHistory(task: ITask): void {
    this.dialog.open(HistoryDialogComponent, {
      width: '600px',
      data: { task }
    });
  }
   onEditTask(task: ITask): void {
    console.log(task);
    
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '500px',
      data: { task, isEdit: true }
    });
  }
}
