export type TaskStatus = 'pending' | 'in progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
