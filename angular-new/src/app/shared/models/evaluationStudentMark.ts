export class EvaluationStudentMark {
    _id: string;
    studentName: string;
    evaluations: EvaluationsStudent[] = [];
    year: number;
    type: number;
    schoolRef: string;
    student: string;
}

export class EvaluationsStudent {
    evaluationName: string;
    levelName: string;
    numComment: number;
    evaluationLevel: string;
    evaluation: string
}