import {TMutatePromiseFunction, TVoidFunction} from "@shared/lib/_common.types.ts";
import {FC, memo} from "react";
import {Form, Input, Modal, } from "antd";
import {ITask} from "@entities/store/tasks/tasks.types.ts";
import {useAppNotification} from "@app/app-notification";
const {TextArea} = Input;
interface IProductDeleteModalProps {
    onCancel: TVoidFunction;
    onConfirm: TMutatePromiseFunction<ITask, void>;
    isActive: boolean;
    loading: boolean;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


export const CreateProductModal: FC<IProductDeleteModalProps> = memo(({onCancel, isActive, onConfirm, loading}) => {
    const [form] = Form.useForm<ITask>();
    const {openNotification} = useAppNotification();


    const handleFinish = (values: ITask) => {
        try {
            void onConfirm({...values, status: "not_completed"});
            openNotification({
                message: "Success",
                type: "success",
                description: "Task has successfully added.",
            });
        } catch (e) {
            const err = e as Error;
            openNotification({
                message: "Error",
                type: "error",
                description: "Failed to add the task. Please try again.",
            });
            console.error(err.message);
        }
    };
    
    return <Modal confirmLoading={loading} title="Create task" open={isActive} onOk={form.submit} onCancel={onCancel}>
        <Form
            {...formItemLayout}
            form={form}
            variant={'filled'}
            style={{ maxWidth: 600 }}
            initialValues={{ variant: 'filled' }}
            onFinish={handleFinish}
        >
            <Form.Item label="Title" name="name" rules={[{ required: true, message: 'Please input!' }, {min: 2, message: "min 2 letters"}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input!' }, {min: 2, message: "min 2 letters"}]}>
                <TextArea />
            </Form.Item>
        </Form>
    </Modal>
});