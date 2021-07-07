import { Trend } from './trend';
import { ClassSchool } from './classSchool';

export class Student {
    _id: string;
    firstName: string;
    tz: string;
    lastName: string;
    bornDate: Date;
    address: string;
    phone: string;
    isActive: boolean;
    classSchool: ClassSchool = new ClassSchool();
    trend: Trend = new Trend();
    schoolRef: string;
}
