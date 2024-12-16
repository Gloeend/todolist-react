import { useCookies } from "react-cookie";
import { IDataModel } from "@entities/api/api.types.ts";
import { ITask } from "@entities/store/tasks/tasks.types.ts";

export const useRemoveFromFavorites = () => {
    const [cookie, setCookie] = useCookies(["favorites"]);

    return (dto: IDataModel<ITask>) => {
        const favorites = cookie.favorites as Pick<IDataModel<ITask>, "id">[];

        if (!favorites) {
            return setCookie("favorites", []);
        }

        const newFavorites = favorites.filter((i) => i.id !== dto.id);
        setCookie("favorites", newFavorites);
    };
};