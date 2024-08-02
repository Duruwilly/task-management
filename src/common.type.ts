export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export enum FilterState {
    All = 'all',
    Completed = 'completed',
    Incomplete = 'incomplete',
  }
