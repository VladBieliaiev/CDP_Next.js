export interface Data {
  _id: string;
  project: string;
  taskType: string;
  time: string;
  description: string;
  date: string;
  [key: string]: string;
}

export interface DataProps {
  task: Data[];
}

export interface ETCTask {
  project: string;
  taskType: string;
  time: string;
  description: string;
  date: string;
}

export interface HeaderProps {
  onToggleForm: () => void;
  onDateRangeChange: (dates: string[]) => void;
}

export interface TaskFormProps {
  onToggleForm: () => void;
}
