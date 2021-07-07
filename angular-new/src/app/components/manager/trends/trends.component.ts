import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Trend } from 'src/app/shared/models/trend';
import { TrendService } from 'src/app/shared/services/trend.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  trends: Trend[] = [];
  trend: Trend = new Trend();
  submitted: boolean = false;
  trendDialog: boolean = false;

  constructor(public trendService: TrendService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.trendService.getAll().subscribe(res => {
      this.trends = res;
    })
  }

  openNew() {
    this.trend = new Trend();
    this.submitted = false;
    this.trendDialog = true;
  }

  editTrend(trend: Trend) {
    this.trend = { ...trend };
    this.trendDialog = true;
  }

  deleteTrend(trend: Trend) {
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
          this.trends = this.trends.filter(val => val._id !== trend._id);
          this.trend = new Trend();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המגמה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.trend.name.trim()) {
      if (this.trend._id) {
        this.trendService.update(this.trend).subscribe(res => {
          this.trends[this.findIndexById(this.trend._id)] = this.trend;
          this.closeSucc();
          this.trendService.getAll().subscribe(res => {
            this.trends = res;
          })
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.trendService.save(this.trend).subscribe(res => {
          this.trends.push(this.trend);
          this.closeSucc();
          this.trendService.getAll().subscribe(res => {
            this.trends = res;
          })
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.trends = [...this.trends];
    this.trendDialog = false;
    this.trend = new Trend();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.trends.length; i++) {
      if (this.trends[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.trendDialog = false;
    this.submitted = false;
  }

}
