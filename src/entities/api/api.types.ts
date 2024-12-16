import {ITask} from "@entities/store/tasks/tasks.types.ts";

export interface IDataModel<Model> {
    id: number;
    attributes: Model;
}

export interface IDataDTO<T> {
    data: T;
}

export interface IErrorResponse {
    data: never;
    error: {
        status: number;
        name: string;
        message: string;
        details: never;
    }
}

export interface IResponseData<Model> {
    data: IDataModel<Model>;
}

export interface IMetaResponseData<Meta, Model> {
    meta: Meta;
    data: Model;
}

export interface IPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface IPaginationClamped {
    pagination: IPagination;
}

export interface IPaginationDTO {
    withCount?: boolean;
    page: number;
    pageSize: number;
    start?: number;
    limit?: number;
}

export interface IPaginationOptions {
    sort?: string;
    fields?: string;
    populate?: string;
    filters?: "",
    locale?: "ru" | "en";
    pagination?: IPaginationDTO;
}


export type TGetTasksDTO = IPaginationOptions;
export type TGetTasksResponse = IMetaResponseData<IPaginationClamped, IDataModel<ITask>[]>;

export type TDeleteTaskDTO = Pick<IDataModel<ITask>, "id">;
export type TDeleteTaskResponse = 0;

export type TCreateTaskDTO = IDataDTO<Pick<ITask, "name" | "description" | "status">>;
export type TCreateTaskResponse = IMetaResponseData<never, IDataModel<ITask>>;

export type TPatchTaskDTO = IDataDTO<Partial<Pick<IDataModel<never>, "id"> & Pick<ITask, "name" | "description" | "status">>>;
export type TPatchTaskResponse = IMetaResponseData<never, IDataModel<ITask>>;
