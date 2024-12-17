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
      const taskWithValidDate = {
        ...action.payload,
        date: action.payload.date ?? new Date().toISOString(), // Asignar la fecha actual si es nula
      };
      state.tasks.push(taskWithValidDate);
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

        // Si el nuevo estado es 'completed', asignar el completeDate
        if (newStatus === "completed") {
          movedTask.completeDate = new Date().toISOString(); // Convertir la fecha a string ISO
        } else {
          movedTask.completeDate = undefined; // Resetear si se mueve fuera de 'completed'
        }

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
    revertTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.status === "completed") {
        task.status = "pending"; // Cambiar el estado a pendiente
        task.completeDate = undefined; // Eliminar la fecha de finalización
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

export const { addTask, deleteTask, moveTask, revertTask } = taskSlice.actions;
export default taskSlice.reducer;
