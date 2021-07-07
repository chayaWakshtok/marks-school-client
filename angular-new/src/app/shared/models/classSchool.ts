import { User } from './user';

export class ClassSchool {
    _id:string;
    className: string;
    endingYear: number;
    teacherRef: any;
    schoolRef: string;
    teacher:User
}