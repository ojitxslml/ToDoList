import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, moveTask } from "./reducers/taskSlice";
import {
  Box,
  Button,
  Container,
  IconButton,
  PaletteMode,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Status, statusMap } from "./types";
import TaskTables from "./components/TaskTable";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import CompletedTasks from "./components/CompletedTasks";

interface AppProps {
  mode: PaletteMode;
  onToggleColorMode: () => void;
}

const App: React.FC<AppProps> = ({ mode, onToggleColorMode }) => {
  const dispatch = useDispatch(); // Acceder a los Task

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        status: "pending" as Status,
        date: new Date().toISOString(),
      };
      dispatch(addTask(newTask)); // Despachar la acción para agregar la nueva tarea
      setNewTaskTitle("");
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
        minHeight: "100vh",
      }}
    >
      <Container>
        <Stack direction={"column"}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Typography component="h1" variant="h1">
              Tasks To Do
            </Typography>
            <Tooltip
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <IconButton
                aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
                color="inherit"
                onClick={onToggleColorMode}
              >
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Stack>

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
        <CompletedTasks />
      </Container>
    </Box>
  );
};

export default App;
