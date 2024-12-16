export interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    resetPasswordToken: string;
    registrationToken: string;
    isActive: boolean;
    roles: string[];
}


export interface IRole {
    name: string;
    code: string;
    description: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    users: [];
    createdBy: string;
    updatedBy: string;
}