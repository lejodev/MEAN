import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { ITask } from '../../interfaces/task.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private httpService: HttpService) { }

  getAllTasks(): Observable<ITask[]> {
    return this.httpService.get('all').pipe(
      tap((tasks: any) => this.tasksSubject.next(tasks as ITask[]))
    ) as Observable<ITask[]>;
  }

  create(task: ITask |Partial<ITask>) {
    return this.httpService.post<ITask>('', task).pipe(
      tap((newTask) => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next([...current, newTask as ITask]);
      })
    );
  }

  delete(taskId: string) {
    return this.httpService.delete(`${taskId}`).pipe(
      tap(() => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next(current.filter(task => task._id !== taskId));
      })
    );
  }

  update(id: string, task: Partial<ITask>): Observable<ITask> {
    return (this.httpService.put(`${id}`, task) as Observable<ITask>).pipe(
      tap((updatedTask: ITask) => {
        const currentTasks = this.tasksSubject.getValue();
        const updatedTasks = currentTasks.map(t => 
          t._id === id ? { ...t, ...updatedTask } : t
        );
        this.tasksSubject.next(updatedTasks);
      })
    );
  }
}
