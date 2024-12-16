import {combineReducers} from "@reduxjs/toolkit";
import {tasksReducer} from "@entities/store/tasks/tasks.slice.ts";

export const reducers = combineReducers({
    tasks: tasksReducer,
});