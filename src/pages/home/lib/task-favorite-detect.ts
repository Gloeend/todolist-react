import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";

export const taskFavoriteDetect = (
    tasks: IDataModel<ITask>[],
    favorites: Pick<IDataModel<ITask>, "id">[]
): IDataModel<ITask>[] => {
    if (tasks.length === 0) {
        return [];
    }
    const favoriteIds = new Set(favorites.map((i) => i.id));

    return tasks.map((task) => ({
        ...task,
        attributes: {
            ...task.attributes,
            isFavorite: favoriteIds.has(task.id),
        },
    }));
};
