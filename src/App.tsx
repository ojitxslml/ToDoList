import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./reducers/taskSlice"; // Ajusta la ruta según tu estructura
import { RootState } from "./store"; // Importar RootState para tipar el estado
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import TaskC from "./components/TaskC";
import { Status } from "./types";

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
        status: "pending" as Status,
      };
      dispatch(addTask(newTask)); // Despachamos la acción para agregar la nueva tarea
      setNewTaskTitle(""); // Limpiamos el campo de entrada después de agregar la tarea
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        /*         background: "linear-gradient(135deg, #E0F7FA 100%, #81D4BA 100%)",  */ // Gradiente de blanco a morado claro
        minHeight: "100vh", // Ocupa toda la altura de la pantalla
      }}
    >
      <Container>
        <Stack direction={"column"}>
          <h1>Tasks</h1>

          <form onSubmit={handleAddTask}>
            <TextField
              id="outlined-basic"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              label="New task"
              size="small"
            />
            <Button
              sx={{ marginLeft: 1 }}
              variant="contained"
              disableElevation
              type="submit"
            >
              Add Task
            </Button>
          </form>

          <ul>
            {tasks.map((task) => (
              <TaskC key={task.id} task={task} /> // Pasamos el task como prop
            ))}
          </ul>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;