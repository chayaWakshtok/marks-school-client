import { Student } from './student';
import { Category } from './category';

export class StudentMarkCategory {
    _id: string;
    studentName: string;
    marks: Marks[] = []
    schoolRef: string;
    student: any;
    studentRef: string;
    finishMark: number;
    certMark:string;
    subject: any;
    year: number;
    type: number;
    comments: StudentMarkComments[] = [];
    commentsString:string="";
}

export class Marks {
    mark: number;
    precent: number;
    endMark: number;
    categoryName: string;
    category: any;
    categoryRef: Category;
}


export class StudentMarkComments {
    name: string;
    comment: any;
}

