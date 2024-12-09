import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, State } from "../types";

// Función para cargar tareas desde localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Estado inicial cargando desde localStorage
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
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // Guardar las tareas actualizadas en localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
