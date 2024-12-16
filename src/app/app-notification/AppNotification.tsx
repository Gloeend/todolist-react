import React, {PropsWithChildren, useCallback} from 'react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    InfoCircleTwoTone,
    QuestionCircleTwoTone
} from "@ant-design/icons";

interface TOpenNotificationProps {
    placement?: NotificationArgsProps["placement"];
    type?: NotificationArgsProps["type"];
    message: NotificationArgsProps["message"];
    description: string;
}

interface IAppNotificationContext {
    openNotification: (props: TOpenNotificationProps) => void;

}
export const AppNotificationContext = React.createContext({} as IAppNotificationContext);

export const AppNotification = ({children}: PropsWithChildren) => {
    const [api, contextHolder] = notification.useNotification();

    const getIconNotification = useCallback((type: NotificationArgsProps["type"]) => {
        switch (type) {
            case "success": return <CheckCircleTwoTone twoToneColor={["#009944", "transparent"]} />;
            case "error": return <CloseCircleTwoTone twoToneColor={["#cf000f", "transparent"]} />;
            case "warning": return <InfoCircleTwoTone twoToneColor={["#f0541e", "transparent"]} />;
            case "info": return <QuestionCircleTwoTone twoToneColor={["#63c0df", "transparent"]} />;
        }
    }, []);

    const openNotification = useCallback(({description, message, placement = "topRight", type = "success"}: TOpenNotificationProps) => {
        api.info({
            icon: getIconNotification(type),
            type: type,
            message: message,
            description: <p>{description}</p>,
            placement: placement,
        });
    }, [api, getIconNotification]);

    return (
        <AppNotificationContext.Provider value={{
            openNotification
        }}>
            {contextHolder}
            {children}
        </AppNotificationContext.Provider>
    );
};