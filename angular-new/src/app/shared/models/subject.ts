import { Trend } from './trend';

export class Subject {
    _id: string;
    subjectName: string;
    numOfProjectsEnter: number = 0;
    numOfProjectsOutside: number = 0;
    numOfProjectsEnd: number = 0;
    trendRef: string;
    trend: Trend = new Trend();
    schoolRef: string;
    type: number = 1;
    semel: string;
}