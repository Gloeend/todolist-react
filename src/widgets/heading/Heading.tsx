import {Button, Flex, Typography} from "antd";
import {useCallback, useState} from "react";
import {CreateProductModal} from "@widgets/heading/ui/create-product-modal/CreateProductModal.tsx";
import {ITask} from "@entities/store/tasks/tasks.types.ts";
import {TasksService} from "@entities/api/tasks";
import {appendTask} from "@entities/store/tasks/tasks.slice.ts";
import {useAppDispatch} from "@entities/store";

const {Title} = Typography;

export const Heading = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [show, set] = useState(false);
    const dispatch = useAppDispatch();

    const close = useCallback(() => set(false), []);

    const onConfirm = useCallback(async (task: ITask) => {
        if (loading) return;
        try {
            setLoading(true);
            const r = await TasksService.createTask({ data: task });
            dispatch(appendTask(r));
            set(false);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error(error as string);
        } finally {
            setLoading(false);
        }
    }, [dispatch, loading]);


    return <Flex justify="space-between">
        <Title level={4}>Todolist</Title>
        <Button onClick={() => set(true)} variant="filled" color="primary">Create Task</Button>
        <CreateProductModal onCancel={close} onConfirm={onConfirm} isActive={show} loading={loading}/>
    </Flex>;
}