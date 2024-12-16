import {IDataModel} from "@entities/api/api.types.ts";
import {ITask} from "@entities/store/tasks/tasks.types.ts";
import {FC, useCallback, useMemo, useState} from "react";
import {Button, Card, Flex, Typography} from "antd";
import {DeleteFilled, EditFilled, StarFilled} from '@ant-design/icons';
import {ProductDeleteModal} from "@widgets/product-card/ui/product-delete-modal";
import {TasksService} from "@entities/api/tasks";
import {useAppDispatch} from "@entities/store";
import {removeFavorite, removeTask, setFavorite, setStatusTask} from "@entities/store/tasks/tasks.slice.ts";
import {ProductStatusModal} from "@widgets/product-card/ui/product-status-modal";
import {IProductStatusForm} from "@widgets/product-card/ui/product-status-modal/ProductStatusModal.tsx";
import {getStatus} from "@shared/lib";
import {useRemoveFromFavorites} from "@entities/cookie/lib/useRemoveFromFavorites.ts";
import {useAppNotification} from "@app/app-notification";
import {useAddToFavorites} from "@entities/cookie/lib/useAddToFavorites.ts";

const {Text, Title} = Typography;

interface IProductCardProps {
    task: IDataModel<ITask>;
}

export const ProductCard: FC<IProductCardProps> = ({task}) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const {openNotification} = useAppNotification();
    const addToFavorites = useAddToFavorites();
    const removeFromFavorites = useRemoveFromFavorites();

    const statusComputed = useMemo(() => {
        const status = task.attributes.status;
        const condition = status === "not_completed" || status === "completed" ? status : "not_completed";
        return getStatus(condition);
    }, [task.attributes.status]);

    const closeDeleteModal = useCallback(() => setShowDeleteModal(false), []);
    const closeStatusModal = useCallback(() => setShowStatusModal(false), []);

    const deleteMemo = useCallback(async () => {
        const dto = {id: task.id};
        setLoading(true);
        try {
            await TasksService.deleteTask(dto);
            dispatch(removeTask(dto));
            setShowDeleteModal(false);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
                throw new Error(e.message);
            }
            console.error(e);
            throw new Error(e as string);
        } finally {
            setLoading(false);
        }
    }, [dispatch, task.id]);

    const statusMemo = useCallback(async (dto: IProductStatusForm) => {
        setLoading(true);
        try {
            await TasksService.patchTask({data: {id: task.id, ...dto}});
            dispatch(setStatusTask({id: task.id, ...dto}));
            setShowStatusModal(false);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
                throw new Error(e.message);
            }
            console.error(e);
            throw new Error(e as string);
        } finally {
            setLoading(false);
        }
    }, [dispatch, task.id]);

    const setFavoriteMemo = useCallback(() => {
        try {
            if (task.attributes.isFavorite) {
                removeFromFavorites(task);
                dispatch(removeFavorite({id: task.id}));
                return openNotification({
                    message: "Success",
                    type: "success",
                    description: "Task removed from favorites.",
                });
            }
            dispatch(setFavorite({id: task.id}));
            addToFavorites(task);
            return openNotification({
                message: "Success",
                type: "success",
                description: "Task added to favorites.",
            });
            
        } catch (_) {
            const err = _ as Error;
            openNotification({
                message: "Error",
                type: "error",
                description: err.message,
            });
        }
        
    }, [addToFavorites, openNotification, removeFromFavorites, task]);

    return <Card
        title={<Flex align="center" justify="space-between">
            <Title style={{margin: 0}} level={4}>{task.attributes.name}</Title>
            <Text>{statusComputed}</Text>
        </Flex>}
        actions={[
            <Button type={task.attributes.isFavorite ? "primary" : "default"} onClick={setFavoriteMemo}><StarFilled
                key="to-favorite"/></Button>,
            <Button variant="outlined" onClick={() => setShowStatusModal(true)}><EditFilled key="set-status"/></Button>,
            <Button onClick={() => setShowDeleteModal(true)}><DeleteFilled key="delete"/></Button>,
        ]}>
        <Text>{task.attributes.description}</Text>
        <ProductDeleteModal loading={loading} isActive={showDeleteModal} onCancel={closeDeleteModal}
                            onConfirm={deleteMemo}/>
        <ProductStatusModal loading={loading} isActive={showStatusModal} onCancel={closeStatusModal}
                            onConfirm={statusMemo}/>
    </Card>;
}