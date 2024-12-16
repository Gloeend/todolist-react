import {taskFavoriteDetect} from "./task-favorite-detect.ts";
import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";

describe("taskFavoriteDetect", () => {
    it("should return an empty array if tasks are empty", () => {
        const tasks: IDataModel<ITask>[] = [];
        const favorites: Pick<IDataModel<ITask>, "id">[] = [];

        const result = taskFavoriteDetect(tasks, favorites);

        expect(result).toEqual([]);
    });

    const mockedArr = [
        {
            id: 1, attributes: {
                name: "Task 1",
                description: "description",
                status: "completed",
                isFavorite: false,
            }
        },
        {
            id: 2, attributes: {
                name: "Task 2",
                description: "description",
                status: "not_completed",
                isFavorite: false,
            }
        },
        {
            id: 3, attributes: {
                name: "Task 3",
                description: "description",
                isFavorite: false,
                status: ""
            }
        },
    ];

    it("should handle tasks without favorites correctly", () => {
        const tasks: IDataModel<ITask>[] = mockedArr.slice(0, 2);
        const favorites: Pick<IDataModel<ITask>, "id">[] = [];

        const result = taskFavoriteDetect(tasks, favorites);

        expect(result).toEqual(mockedArr.slice(0, 2));
    });

    it("should handle cases where none of the tasks are favorites", () => {
        const tasks: IDataModel<ITask>[] = mockedArr.slice(0, 2);
        const favorites: Pick<IDataModel<ITask>, "id">[] = [{id: 3}];

        const result = taskFavoriteDetect(tasks, favorites);

        expect(result).toEqual(mockedArr.slice(0, 2));
    });

    it("should not modify the original input arrays", () => {
        const tasks: IDataModel<ITask>[] = mockedArr.slice(0, 2);
        const favorites: Pick<IDataModel<ITask>, "id">[] = [{id: 1}];

        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        const favoritesCopy = JSON.parse(JSON.stringify(favorites));

        taskFavoriteDetect(tasks, favorites);

        expect(tasks).toEqual(tasksCopy);
        expect(favorites).toEqual(favoritesCopy);
    });
});
