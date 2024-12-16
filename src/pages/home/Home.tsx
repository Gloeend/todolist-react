import {appendTasks, selectTasks, setPagination} from "@entities/store/tasks/tasks.slice.ts";
import {useAppDispatch, useAppSelector} from "@entities/store";
import {ProductCard} from "@widgets/product-card";
import {Col, Row, Typography} from "antd";
import {useInfinityScroll} from "@pages/home/lib/useInfinityScroll.ts";
import {TasksService} from "@entities/api/tasks";
import {useCallback, useMemo, useState} from "react";
import {useGetFavorites} from "@entities/cookie/lib/useGetFavorites.ts";
import {taskFavoriteDetect} from "@pages/home/lib/task-favorite-detect.ts";
import {ProductFilterProvider} from "@widgets/product-filter-provider";
import {useProductFilterContext} from "@widgets/product-filter-provider/lib/useProductFilterContext.ts";
import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";

const {Title} = Typography;

const Page = () => {
    const {tasks, pagination} = useAppSelector(selectTasks);
    const {completed, onlyFavorites} = useProductFilterContext();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const favorites = useGetFavorites();
    
    const filteredTasks = useMemo(() => {
        let r: IDataModel<ITask>[] = [];
        if (onlyFavorites) {
            r = tasks.filter(task => task.attributes.isFavorite);
        } else {
            r = tasks;
        }
        switch (completed) {
            case "all": return r;
            case "completed": return r.filter(task => task.attributes.status === "completed");
            case "not_completed": return r.filter(task => (task.attributes.status === "not_com" || task.attributes.status === null));
        }
    }, [completed, onlyFavorites, tasks]);

    const fetchTasks = useCallback(async () => {
        if (pagination.page === pagination.pageCount || loading) return;
        setLoading(true);
        try {
            const np = pagination.page + 1;
            const r = await TasksService.getTasks({pagination: {...pagination, page: np}});
            const favoriteSorted = taskFavoriteDetect(r.data, favorites());

            dispatch(appendTasks(favoriteSorted));
            dispatch(setPagination(r.meta.pagination));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, favorites, loading, pagination]);

    useInfinityScroll(fetchTasks);

    return (
        <section>
            {filteredTasks.length === 0 ? (
                <Title level={3} style={{textAlign: "center"}}>Not found items</Title>
            ) : (
                filteredTasks.length > 0 && <Row gutter={[16, 16]} style={{padding: "2rem 0"}}>
                    {filteredTasks.map((task, ind) =>
                        <Col
                            key={ind}
                            xs={{ span: '24' }}
                            sm={{ span: '24' }}
                            md={{ span: '12' }}
                            lg={{ span: '8' }}
                            xl={{ span: '6' }}
                            children={<ProductCard task={task}/>}
                        />)}
                </Row>
            )}
        </section>
    );
};

export const Home = () => <ProductFilterProvider><Page/></ProductFilterProvider>