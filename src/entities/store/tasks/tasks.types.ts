import {IResponseData} from "@entities/api/api.types.ts";
import {IUser} from "@entities/store/user/types.ts";

export interface ITask {
    name: string;
    description: string;
    status: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: IResponseData<IUser>;
    createdBy?: IResponseData<IUser>;
    isFavorite?: boolean;
}