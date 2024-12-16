import {useCookies} from "react-cookie";
import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";

export const useGetFavorites = () => {
    const [cookie, setCookie] = useCookies(["favorites"]);

    return () => {
        if (!cookie.favorites) {
            setCookie("favorites", []);
            return [];
        }
        return cookie.favorites as Pick<IDataModel<ITask>, "id">[];
    }
}