import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, State } from "../types";

// Función para cargar tareas desde localStorage (solo una vez)
const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Estado inicial cargando desde localStorage solo una vez
const initialState: State = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      // Guardar las tareas actualizadas en localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      // Solo actualizamos localStorage si la lista ha cambiado
      if (updatedTasks.length !== state.tasks.length) {
        state.tasks = updatedTasks;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex !== -1) {
        // Cambiar el estado de la tarea a "completed"
        state.tasks[taskIndex].status = "completed";
        // Guardar las tareas actualizadas en localStorage
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
