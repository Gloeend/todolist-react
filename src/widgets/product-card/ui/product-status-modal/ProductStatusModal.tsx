import {FC, memo} from "react";
import {Form, Select, Modal} from "antd";
import {TMutatePromiseFunction, TVoidFunction} from "@shared/lib/_common.types.ts";
import {useAppNotification} from "@app/app-notification";
import {statusSelectMock} from "@widgets/product-card/lib/status-select.mock.ts";

interface IProductStatusModalProps {
    onCancel: TVoidFunction;
    onConfirm: TMutatePromiseFunction<IProductStatusForm, void>;
    isActive: boolean;
    loading: boolean;
}

export interface IProductStatusForm {
    status: string;
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


export const ProductStatusModal: FC<IProductStatusModalProps> = memo(({onCancel, isActive, onConfirm, loading}) => {
    const [form] = Form.useForm<IProductStatusForm>();
    const {openNotification} = useAppNotification();

    const handleFinish = (values: IProductStatusForm) => {
        try {
            void onConfirm(values);
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
    };

    return <Modal confirmLoading={loading} title="Change status" open={isActive} onOk={form.submit} onCancel={onCancel}>
        <Form
            {...formItemLayout}
            form={form}
            variant={'filled'}
            style={{ maxWidth: 600 }}
            initialValues={{ variant: 'filled' }}
            onFinish={handleFinish}
        >
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select!' }]}>
                <Select>
                    {statusSelectMock.map(
                        el => <Select.Option key={el.value} value={el.value}>{el.title}</Select.Option>
                    )}
                </Select>
            </Form.Item>
        </Form>
    </Modal>
})