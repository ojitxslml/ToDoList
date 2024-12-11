import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, State, Status } from "../types";

// Cargar tareas desde localStorage al iniciar la aplicación
const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Guardar tareas en localStorage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Estado inicial
const initialState: State = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    //gracias chatgpt xd
    moveTask: (
      state,
      action: PayloadAction<{
        id: string;
        newStatus: Status;
        newIndex: number;
      }>
    ) => {
      const { id, newStatus, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const [movedTask] = state.tasks.splice(taskIndex, 1); // Eliminar tarea de su posición original
        movedTask.status = newStatus; // Actualizar el estado

        // Obtener todas las tareas con el nuevo estado
        const tasksInNewColumn = state.tasks.filter(
          (task) => task.status === newStatus
        );

        // Insertar la tarea en la nueva posición
        tasksInNewColumn.splice(newIndex, 0, movedTask);

        // Reconstruir el arreglo de tareas manteniendo las demás columnas
        state.tasks = [
          ...state.tasks.filter((task) => task.status !== newStatus),
          ...tasksInNewColumn,
        ];
        saveTasksToLocalStorage(state.tasks); // Guardar en localStorage
      }
    },
  },
});

export const { addTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;