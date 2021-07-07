import { Component, OnInit } from '@angular/core';
import { MarkRange } from 'src/app/shared/models/markRange';
import { MarkRangeService } from 'src/app/shared/services/markRange.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-mark-range',
  templateUrl: './mark-range.component.html',
  styleUrls: ['./mark-range.component.scss']
})
export class MarkRangeComponent implements OnInit {
  marksRange: MarkRange[] = [];
  markRange: MarkRange = new MarkRange();
  submitted: boolean = false;
  markDialog: boolean = false;

  constructor(public markService: MarkRangeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.markService.getAll().subscribe(res => {
      this.marksRange = res;
    });
  }

  openNew() {
    this.markRange = new MarkRange();
    this.submitted = false;
    this.markDialog = true;
  }

  editTrend(c: MarkRange) {
    this.markRange = { ...c };
    this.markDialog = true;
  }

  deleteTrend(classSchool: MarkRange) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקה  ?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.markService.delete(classSchool._id).subscribe(res => {
          this.marksRange = this.marksRange.filter(val => val._id !== classSchool._id);
          this.markRange = new MarkRange();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'טווח הציון נמחק', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.markRange.endMark) {
      if (this.markRange._id) {
        this.markService.update(this.markRange).subscribe(res => {
          this.marksRange[this.findIndexById(this.markRange._id)] = this.markRange;
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
      
        this.markService.save(this.markRange).subscribe(res => {
          this.markService.getAll().subscribe(res => {
            this.marksRange = res;
          })
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.marksRange = [...this.marksRange];
    this.markDialog = false;
    this.markRange = new MarkRange();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.marksRange.length; i++) {
      if (this.marksRange[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.markDialog = false;
    this.submitted = false;
  }

}
