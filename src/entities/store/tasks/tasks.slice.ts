import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@entities/store"
import {ITask} from "@entities/store/tasks/tasks.types.ts";
import {IDataModel, IPagination} from "@entities/api/api.types.ts";

export interface ITasksSlice {
  tasks: IDataModel<ITask>[];
  pagination: IPagination;
}

const initialState: ITasksSlice = {} as ITasksSlice;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setPagination: (state, {payload}: PayloadAction<IPagination>) => {
      state.pagination = payload;
    },
    setTasks: (state, action: PayloadAction<IDataModel<ITask>[]>) => {
      state.tasks = action.payload;
    },
    appendTask: (state, action: PayloadAction<IDataModel<ITask>>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    appendTasks: (state, action: PayloadAction<IDataModel<ITask>[]>) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    setFavorite: (state, {payload}: PayloadAction<Pick<IDataModel<ITask>, "id">>) => {
      const task = state.tasks.find((task) => task.id === payload.id);

      if (!task) {
        throw new Error("Task not found");
      }

      task.attributes.isFavorite = true;
    },
    removeFavorite: (state, {payload}: PayloadAction<Pick<IDataModel<ITask>, "id">>) => {
      const task = state.tasks.find((task) => task.id === payload.id);

      if (!task) {
        throw new Error("Task not found");
      }

      task.attributes.isFavorite = false;
    },
    removeTask: (state, {payload: {id}}: PayloadAction<Pick<IDataModel<ITask>, "id">>) => {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setStatusTask: (state, { payload }: PayloadAction<Pick<IDataModel<never>, "id"> & Pick<ITask, "status">>) => {
      const task = state.tasks.find((task) => task.id === payload.id);

      if (!task) {
        throw new Error("Task not found");
      }

      task.attributes.status = payload.status;
    },
  }
});

export const selectTasks = (state: RootState): ITasksSlice => state.tasks;

export const { setTasks, appendTask, removeTask, setPagination, setStatusTask, appendTasks, removeFavorite, setFavorite } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;