import {AppNotificationContext} from "@app/app-notification/AppNotification.tsx";
import {useContext} from "react";

export const useAppNotification = () => useContext(AppNotificationContext);