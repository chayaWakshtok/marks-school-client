import { Student } from './student';
import { Category } from './category';
import { CategoryProject } from './categoryProject';

export class StudentMarkCategoryProject {
    _id: string;
    studentName: string;
    marks: MarksProj[] = []
    schoolRef: string;
    student: any;
    studentRef: string;
    finishMark: number;
    project: any;
    year: number;
    type: number;
    classSchool:any;
    subject:any;
    certMark:number;
}


export class MarksProj {
    mark: number;
    precent: number;
    endMark: number;
    categoryName: string;
    category: any;
    categoryRef: CategoryProject;
}