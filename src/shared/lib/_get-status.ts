const status = {
    completed: "completed",
    not_completed: "not completed",
} as const;

export type StatusKey = keyof typeof status;

export const getStatus = (key: StatusKey): string => {
    return status[key];
};