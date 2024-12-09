import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "./reducers/taskSlice"; // Ajusta la ruta según tu estructura
import { RootState } from "./store"; // Importar RootState para tipar el estado

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Accedemos solo a tasks

  const [newTaskTitle, setNewTaskTitle] = useState(""); // Estado local para el título de la nueva tarea

  // Manejador del evento de submit para agregar tarea
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(), // Generamos un ID único basado en el tiempo (puedes usar otra estrategia)
        title: newTaskTitle.trim(),
      };
      dispatch(addTask(newTask)); // Despachamos la acción para agregar la nueva tarea
      setNewTaskTitle(""); // Limpiamos el campo de entrada después de agregar la tarea
    }
  };

  return (
    <div>
      <h1>Tasks</h1>

      {/* Formulario para agregar una tarea */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)} // Actualiza el estado con el valor del input
          placeholder="New task"
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Lista de tareas */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
