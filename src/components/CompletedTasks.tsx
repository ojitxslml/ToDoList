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
import { revertTask } from "../reducers/taskSlice";

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
        // Parsear la fecha en formato ISO y convertir a la zona horaria local
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
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ my: 4 }}>
        Completed Tasks
      </Typography>
      {!tasksByDate[today]?.length && (
        <Typography sx={{ my: 4 }}>
          No tasks completed yet for today.
        </Typography>
      )}

      <Box
        sx={{
          maxHeight: "500px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {sortedDates.length > 0 &&
          sortedDates.map((date, index) => (
            <Box key={date} mb={4}>
              <Typography variant="h6" gutterBottom>
                {isToday(parseISO(date))
                  ? "Today ✨"
                  : format(parseISO(date), "MMMM dd, yyyy")}
              </Typography>

              {/* Mostrar solo las primeras 5 fechas */}
              {index < 5 && (
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
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CompletedTasks;
