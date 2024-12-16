import {
    IErrorResponse,
    TCreateTaskDTO,
    TCreateTaskResponse,
    TDeleteTaskDTO,
    TDeleteTaskResponse,
    TGetTasksDTO,
    TGetTasksResponse,
    TPatchTaskDTO,
    TPatchTaskResponse
} from "@entities/api/api.types.ts";
import {api} from "@entities/api";
import {AxiosError} from "axios";

export class TasksService {
    public static async getTasks(dto: TGetTasksDTO) {
        try {
            return await api.get<TGetTasksDTO, TGetTasksResponse>('tasks', dto);
        } catch (e: unknown) {
            const err = e as AxiosError<IErrorResponse>;
            if (err.response) {
                throw new Error(err.response.data.error.message);
            }
            throw new Error("Something went wrong");
        }
    }

    public static async deleteTask({id}: TDeleteTaskDTO) {
        try {
            await api.delete<TDeleteTaskResponse>(`tasks/${id}`);
            return true;
        } catch (e: unknown) {
            const err = e as AxiosError<IErrorResponse>;
            if (err.response) {
                throw new Error(err.response.data.error.message);
            }
            throw new Error("Something went wrong");
        }
    }

    public static async createTask(dto: TCreateTaskDTO) {
        try {
            const r = await api.post<TCreateTaskDTO, TCreateTaskResponse>("tasks", dto);
            return r.data;
        } catch (e: unknown) {
            const err = e as AxiosError<IErrorResponse>;
            if (err.response) {
                throw new Error(err.response.data.error.message);
            }
            throw new Error("Something went wrong");
        }
    }

    public static async patchTask(dto: TPatchTaskDTO) {
        try {
            const r = await api.put<TPatchTaskDTO, TPatchTaskResponse>(`tasks/${dto.data.id}`, dto);
            return r.data;
        } catch (e: unknown) {
            const err = e as AxiosError<IErrorResponse>;
            if (err.response) {
                throw new Error(err.response.data.error.message);
            }
            throw new Error("Something went wrong");
        }
    }
}