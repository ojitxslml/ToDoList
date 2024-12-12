import { useDispatch } from "react-redux";
import { Task } from "../types";
import { deleteTask } from "../reducers/taskSlice";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "@hello-pangea/dnd";

//Interfaz de los props
interface TaskCProps {
  task: Task;
  index: number;
}

const TaskC: React.FC<TaskCProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <TableRow
          sx={{ marginBottom: 1, opacity: snapshot.isDragging ? 0.9 : 1, backgroundColor: "white" }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TableCell>{task.title}</TableCell>
          <TableCell>
            {task.status === "completed"
              ? "Completed"
              : task.status === "inProgress"
              ? "In Progress"
              : "Pending"}
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
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  );
};

export default TaskC;
