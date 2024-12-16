import {ITask} from "@entities/store/tasks/tasks.types.ts";
import {IDataModel} from "@entities/api/api.types.ts";

// Deprecated
export const taskSorting = (tasks: IDataModel<ITask>[], result: IDataModel<ITask>[][] = []): IDataModel<ITask>[][] => {
    if (tasks.length === 0) {
        return result;
    }

    const chunk = tasks.slice(0, 4);
    return taskSorting(tasks.slice(4), [...result, chunk]);
};