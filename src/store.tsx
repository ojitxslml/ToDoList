import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
