import { useDispatch } from "react-redux";
import { Task } from "../types";
import { completeTask, deleteTask } from "../reducers/taskSlice";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
interface TaskCProps {
  task: Task; // Recibes una tarea como prop
}

const TaskC: React.FC<TaskCProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>
        {task.status === "completed" ? "Completed" : "Pending"}
      </TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="Delete Task"
          size="small"
          sx={{
            backgroundColor: "red",
            color: "white",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.error.dark,
            },
          }}
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="Complete Task"
          size="small"
          sx={{
            backgroundColor: "green",
            color: "white",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.success.dark,
            },
          }}
          onClick={() => dispatch(completeTask(task.id))}
        >
          <CheckIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TaskC;
