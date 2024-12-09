// types.ts
export interface Task {
    id: string;
    title: string;
  }
  
  export interface State {
    tasks: Task[];
  }
  
  export interface AddTaskAction {
    type: "ADD_TASK";
    payload: Task;
  }
  
  export interface State {
    tasks: Task[];
  }
  export interface DeleteTaskAction {
    type: "DELETE_TASK";
    payload: string; // ID de la tarea a eliminar
  }
  
  export type Action = AddTaskAction | DeleteTaskAction;
  