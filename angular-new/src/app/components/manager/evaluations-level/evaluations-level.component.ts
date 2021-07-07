import { Component, OnInit } from '@angular/core';
import { EvaluationLevel } from 'src/app/shared/models/evaluationLevel';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EvaluationLevelService } from 'src/app/shared/services/evaluation-level.service';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';
import { Evaluation } from 'src/app/shared/models/evaluation';

@Component({
  selector: 'app-evaluations-level',
  templateUrl: './evaluations-level.component.html',
  styleUrls: ['./evaluations-level.component.scss']
})
export class EvaluationsLevelComponent implements OnInit {

  evaluationLevels: EvaluationLevel[] = [];
  evaluationLevel: EvaluationLevel = new EvaluationLevel();
  submitted: boolean = false;
  evaluationDialog: boolean = false;
  evaluations: Evaluation[] = [];

  constructor(public trendService: EvaluationLevelService,
    private evalService: EvaluationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.trendService.getAll().subscribe(res => {
      this.evaluationLevels = res;
    });
    this.evalService.getAll().subscribe(res => {
      this.evaluations = res;
    })
  }

  openNew() {
    this.evaluationLevel = new EvaluationLevel();
    this.submitted = false;
    this.evaluationDialog = true;
  }


  editTrend(trend: EvaluationLevel) {
    this.evaluationLevel = { ...trend };
    this.evaluationDialog = true;
  }

  deleteTrend(trend: EvaluationLevel) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקה  ' + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trendService.delete(trend._id).subscribe(res => {
          this.evaluationLevels = this.evaluationLevels.filter(val => val._id !== trend._id);
          this.evaluationLevel = new EvaluationLevel();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'הערכות לתעודה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;
    if (this.evaluationLevel._id) {
      this.trendService.update(this.evaluationLevel).subscribe(res => {
        this.evaluationLevels[this.findIndexById(this.evaluationLevel._id)] = this.evaluationLevel;
        this.closeSucc();
        //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      })
    }
    else {
      this.trendService.save(this.evaluationLevel).subscribe(res => {
        this.evaluationLevels.push(res);
        this.closeSucc();
        //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      })
    }

  }

  closeSucc() {
    this.evaluationLevels = [...this.evaluationLevels];
    this.trendService.getAll().subscribe(res => {
      this.evaluationLevels = res;
    });
    this.evaluationDialog = false;
    this.evaluationLevel = new EvaluationLevel();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.evaluationLevels.length; i++) {
      if (this.evaluationLevels[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.evaluationDialog = false;
    this.submitted = false;
  }

}
