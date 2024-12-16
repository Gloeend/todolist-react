import {Modal} from "antd";
import {TPromiseFunction, TVoidFunction} from "@shared/lib/_common.types.ts";
import {FC, memo, useCallback} from "react";
import {useAppNotification} from "@app/app-notification";

interface IProductDeleteModalProps {
    onCancel: TVoidFunction;
    onConfirm: TPromiseFunction<void>;
    isActive: boolean;
    loading: boolean;
}

export const ProductDeleteModal: FC<IProductDeleteModalProps> = memo(({onCancel, isActive, onConfirm, loading}) => {
    const {openNotification} = useAppNotification();
    
    const onOk = useCallback(() => {
        try {
            void onConfirm()
            openNotification({
                message: "Success",
                type: "success",
                description: "Task status has successfully changed.",
            });
        } catch (e) {
            const err = e as Error;
            openNotification({
                message: "Error",
                type: "error",
                description: "Failed to change task status. Please try again.",
            });
            console.error(err.message);
        }
    }, [onConfirm, openNotification])
    return <Modal confirmLoading={loading} title="Delete element" open={isActive} onOk={onOk} onCancel={onCancel}>Are you sure you want to delete this item?</Modal>
});