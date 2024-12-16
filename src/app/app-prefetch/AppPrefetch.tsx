import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {TasksService} from "@entities/api/tasks";
import {IPaginationOptions} from "@entities/api/api.types.ts";
import {useAppDispatch} from "@entities/store";
import {Spin} from "antd";
import {setPagination, setTasks} from "@entities/store/tasks/tasks.slice.ts";
import {useAppNotification} from "@app/app-notification";
import {useGetFavorites} from "@entities/cookie/lib/useGetFavorites.ts";
import {taskFavoriteDetect} from "@pages/home/lib/task-favorite-detect.ts";

// Вот эти параметры для пагинации не отрабатывают вообще, или через раз. Почему? Не знаю. Возможно из-за пустой базы
// const product-filter: IPaginationOptions = {
//     fields: "",
//     filters: "",
//     locale: "ru",
//     pagination: {
//         withCount: true,
//         page: 1,
//         pageSize: 25,
//         start: 0,
//         limit: 25
//     },
// }
// Так что мы используем такой object
const filter: IPaginationOptions = {
    pagination: {
        withCount: true,
        page: 1,
        pageSize: 12
    }
};

export const AppPrefetch = ({children}: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const {openNotification} = useAppNotification();
    const [loading, setLoading] = useState(false);
    const favorites = useGetFavorites();

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const {data, meta} = await TasksService.getTasks(filter);
            const favoriteSorted = taskFavoriteDetect(data, favorites());

            dispatch(setTasks(favoriteSorted));
            dispatch(setPagination(meta.pagination));
        } catch (e) {
            if (e instanceof Error) {
                openNotification({description: "Something broken", message: "Error", placement: "topRight", type: "error"});
                return console.error(e.message);
            }
            openNotification({description: "Something broken", message: "Error", placement: "topRight", type: "error"});
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [dispatch, openNotification]);

    useEffect(() => {
        void fetchTasks();
    }, [fetchTasks]);

    return loading ? <Spin size="large" spinning={loading} fullscreen={true} tip={<p>App loading</p>}/> : children;
}