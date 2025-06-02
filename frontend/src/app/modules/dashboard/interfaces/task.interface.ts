export type TaskStatus = 'pending' | 'in progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  _id?: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date;
  tags?: string[];
  history?: ITaskHistory[];
}

export interface ITaskHistory {
  field: string;
  oldValue: any;
  newValue: any;
  changedAt: Date;
}
