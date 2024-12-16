import {useCookies} from "react-cookie";
import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";

export const useAddToFavorites = () => {
    const [cookie, setCookie] = useCookies(["favorites"]);
    return (dto: IDataModel<ITask>) => {

        if (!cookie.favorites) {
            return setCookie("favorites", []);
        }

        setCookie("favorites", [...cookie.favorites as [], dto]);
    };
}