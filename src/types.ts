export interface Task {
  id: string;
  title: string;
  status: Status;
  date: Date;
  completeDate?: Date;
}

export type Status = "pending" | "completed" | "inProgress";

export interface State {
  tasks: Task[];
}

//Mapa de los estados para utilizar en la función "OnDragEnd"
export const statusMap: Record<string, Status> = {
  "Pending Tasks": "pending",
  "In Progress Tasks": "inProgress",
  "Completed Tasks": "completed",
};

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
