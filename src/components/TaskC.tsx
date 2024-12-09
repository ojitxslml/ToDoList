import { useDispatch } from "react-redux";
import { Task } from "../types";
import { completeTask, deleteTask } from "../reducers/taskSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
interface TaskCProps {
  task: Task; // Recibes una tarea como prop
}

const TaskC: React.FC<TaskCProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li key={task.id}>
      {task.title}{" "}
      {task.status == "completed" ? (
        <span>*Completada*</span>
      ) : (
        <span>*Pendiente*</span>
      )}
      <IconButton
        size="small"
        sx={{
          backgroundColor: "red",
          color: "white",
          marginLeft: 1,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.error.dark, // Usa el tono oscuro del color error del tema
          },
        }}
        onClick={() => dispatch(deleteTask(task.id))}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          backgroundColor: "green", // Color de fondo verde
          color: "white",
          marginLeft: 1,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.success.dark, // Usa un tono oscuro de verde del tema
          },
        }}
        onClick={() => dispatch(completeTask(task.id))}
      >
        <CheckIcon />
      </IconButton>
    </li>
  );
};

export default TaskC;
