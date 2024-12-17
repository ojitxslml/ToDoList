import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Task } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TaskC from "./TaskC";
import { Droppable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { parseISO } from "date-fns/parseISO";

const TaskTables: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const today = format(new Date(), "yyyy-MM-dd");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter(
    (task) =>
      task.status === "completed" &&
      task.completeDate &&
      format(parseISO(task.completeDate), "yyyy-MM-dd") === today
  );
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");

  const renderTable = (tasks: Task[], title: string) => (
    <TableContainer
      component={Paper}
      sx={{
        margin: 1,
        minWidth: 300,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      {tasks.length === 0 ? (
        <Typography variant="body2" sx={{ padding: 2, textAlign: "center" }}>
          <Droppable droppableId={title}>
            {(droppableProvided, snapshot) => (
              <TableBody
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography>No tasks available.</Typography>
                {droppableProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId={title}>
            {(droppableProvided, snapshot) => (
              <TableBody
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
              >
                {tasks.map((task, index) => (
                  <TaskC key={task.id} task={task} index={index} />
                ))}
                {droppableProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      )}
    </TableContainer>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "center" : "flex-start",
      }}
    >
      {renderTable(pendingTasks, "Pending Tasks")}
      {renderTable(inProgressTasks, "In Progress Tasks")}
      {renderTable(completedTasks, "Today Completed Tasks")}
    </div>
  );
};

export default TaskTables;
