import { Role } from "./role";

export class SvcUser {
    k:number;
    id: number;
    isActive: boolean;
    userName: String;
    email: String;
    phoneNumber: String;
    name: String;
    fallbackContact: String;
    isApiUser: boolean;
    lastActivity: Date;
    isExternal: boolean;
    notification : Notification;
    reports : Array<any>;
    role : Role;

}
