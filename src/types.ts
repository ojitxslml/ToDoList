// types.ts
export interface Task {
  id: string;
  title: string;
  status: Status;
}

export type Status = "pending" | "completed" | "inProgress"; // Define correctamente la unión de estados

export interface State {
  tasks: Task[];
}

export interface AddTaskAction {
  type: "ADD_TASK";
  payload: Task;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: string; // ID de la tarea a eliminar
}

export interface CompleteTaskAction {
  type: "COMPLETE_TASK";
  payload: string; // ID de la tarea a cambiar status
}

export type Action = AddTaskAction | DeleteTaskAction | CompleteTaskAction;
