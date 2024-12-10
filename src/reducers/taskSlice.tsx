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
    // Agregar una nueva tarea
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks); // Actualiza localStorage
    },

    // Eliminar una tarea por su ID
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); // Actualiza localStorage
    },

    // Marcar una tarea como completada
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = "completed";
        saveTasksToLocalStorage(state.tasks); // Actualiza localStorage
      }
    },

    // Cambiar el estado de una tarea (para drag & drop)
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Status }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status; // Ahora TypeScript sabe que status es de tipo Status
        saveTasksToLocalStorage(state.tasks); // Actualiza localStorage
      }
    },
  },
});

export const { addTask, deleteTask, completeTask, updateTaskStatus } =
  taskSlice.actions;
export default taskSlice.reducer;
