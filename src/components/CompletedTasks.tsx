import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { format, isToday } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import { revertTask } from "../reducers/taskSlice"; // Importar la acción de revertir tarea

const CompletedTasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Filtrar tareas completadas
  const completedTasks = tasks.filter(
    (t) => t.status === "completed" && t.completeDate
  );

  // Agrupar tareas completadas por fecha
  const tasksByDate = completedTasks.reduce(
    (acc: Record<string, typeof tasks>, task) => {
      if (task.completeDate) {
        // Parseamos la fecha en formato ISO y la convertimos a la zona horaria local
        const date = format(parseISO(task.completeDate), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
      }
      return acc;
    },
    {}
  );

  // Obtener las fechas ordenadas
  const sortedDates = Object.keys(tasksByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Fecha actual
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Completed Tasks
      </Typography>

      {/* Mostrar tareas completadas en una tabla */}
      {sortedDates.length > 0 &&
        sortedDates.map((date) => (
          <Box key={date} mb={4}>
            <Typography variant="h6" gutterBottom>
              {isToday(parseISO(date))
                ? "Today ✨"
                : format(parseISO(date), "MMMM dd, yyyy")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 700 }}>
                    Time
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 700 }}>
                    Task Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasksByDate[date].map((task) => (
                  <TableRow key={task.id}>
                    <TableCell align="left">
                      {task.completeDate
                        ? format(parseISO(task.completeDate), "hh:mm a")
                        : "N/A"}
                    </TableCell>
                    <TableCell align="left">{task.title}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => dispatch(revertTask(task.id))}
                      >
                        Revert to Pending
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}

      {/* Mostrar mensaje si no hay tareas completadas hoy */}
      {!tasksByDate[today]?.length && (
        <Typography>No tasks completed yet for today.</Typography>
      )}
    </Box>
  );
};

export default CompletedTasks;
