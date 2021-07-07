import { School } from "./school";

export class User {
    _id:string;
    name: string;
    email: string;
    password: string;
    tzId: string;
    phone: string;
    isActive: boolean;
    school: School=new School();
    role: string;
    accessToken:string;
}