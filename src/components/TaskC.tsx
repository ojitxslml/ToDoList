import { useDispatch } from "react-redux";
import { Status, Task } from "../types";
import { deleteTask, moveTask } from "../reducers/taskSlice";
import {
  IconButton,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

//Interfaz de los props
interface TaskCProps {
  task: Task;
  index: number;
}

const TaskC: React.FC<TaskCProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Status>(task.status);

  // Hook para detectar si el dispositivo es móvil
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    setNewStatus(event.target.value as Status);
  };
  const handleSave = () => {
    dispatch(
      moveTask({
        id: task.id,
        newStatus,
        newIndex: index, // Ajustar si es necesario
      })
    );
    handleCloseModal();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    setOpenModal(false); // Cierra el dialog después de eliminar
  };

  return (
    <>
      <Draggable draggableId={String(task.id)} index={index}>
        {(provided, snapshot) => (
          <TableRow
            sx={{
              marginBottom: 1,
              opacity: snapshot.isDragging ? 0.9 : 1,
              backgroundColor: "white",
            }}
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
              {!isMobile ? (
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
              ) : (
                <IconButton
                  aria-label="Change Status"
                  size="small"
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    marginLeft: 1,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  }}
                  onClick={handleOpenModal}
                >
                  <ChangeCircleIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )}
      </Draggable>

      {isMobile && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Change Task Status</DialogTitle>
          <DialogContent>
            <Select
              value={newStatus}
              onChange={handleStatusChange}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions sx={{mx: 2, mb: 2}}>
            <Button
              onClick={handleDeleteTask}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
            <Button onClick={handleSave} variant="contained" size="small">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default TaskC;
