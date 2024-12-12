import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, moveTask } from "./reducers/taskSlice";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { Status, statusMap } from "./types";
import TaskTables from "./components/TaskTable";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";

const App: React.FC = () => {
  const dispatch = useDispatch(); // Acceder a los Task

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

  const OnDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
  
    //Si no es arrastrado a un Droppable item
    if (!destination) return;
  
    const sourceStatus = statusMap[source.droppableId];
    const destinationStatus = statusMap[destination.droppableId];
  
    if (!sourceStatus || !destinationStatus) {
      console.error(
        "Estado no reconocido:",
        source.droppableId,
        destination.droppableId
      );
      return;
    }
  
    // Manejar el movimiento de la tarea
    dispatch(
      moveTask({
        id: draggableId,
        newStatus: destinationStatus,
        newIndex: destination.index,
      })
    );
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh", // Ocupa toda la altura de la pantalla
      }}
    >
      <Container>
        <Stack direction={"column"}>
          <h1>Tasks To Do</h1>

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
          <DragDropContext onDragEnd={OnDragEnd}>
            <br />
            <TaskTables />
          </DragDropContext>
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
