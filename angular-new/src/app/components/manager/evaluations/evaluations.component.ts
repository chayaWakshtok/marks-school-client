import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/shared/models/evaluation';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

  evaluations: Evaluation[] = [];
  evaluation: Evaluation = new Evaluation();
  submitted: boolean = false;
  evaluationDialog: boolean = false;
  levelDialog:boolean=false;

  constructor(public trendService: EvaluationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.trendService.getAll().subscribe(res => {
      this.evaluations = res;
    })
  }

  openNew() {
    this.evaluation = new Evaluation();
    this.submitted = false;
    this.evaluationDialog = true;
  }

  openDialogLevel()
  {
    
  }

  editTrend(trend: Evaluation) {
    this.evaluation = { ...trend };
    this.evaluationDialog = true;
  }

  deleteTrend(trend: Evaluation) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + trend.name + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trendService.delete(trend._id).subscribe(res => {
          this.evaluations = this.evaluations.filter(val => val._id !== trend._id);
          this.evaluation = new Evaluation();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המגמה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.evaluation.name.trim()) {
      if (this.evaluation._id) {
        this.trendService.update(this.evaluation).subscribe(res => {
          this.evaluations[this.findIndexById(this.evaluation._id)] = this.evaluation;
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.trendService.save(this.evaluation).subscribe(res => {
          this.evaluations.push(res);
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.evaluations = [...this.evaluations];
    this.evaluationDialog = false;
    this.evaluation = new Evaluation();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.evaluations.length; i++) {
      if (this.evaluations[i]._id === id) {
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
