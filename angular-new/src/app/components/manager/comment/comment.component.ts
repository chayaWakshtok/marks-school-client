import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import {Comment} from '../../../shared/models/comment'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];
  comment: Comment = new Comment();
  submitted: boolean = false;
  commentDialog: boolean = false;

  constructor(public commetService: CommentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.commetService.getAll().subscribe(res => {
      this.comments = res;
    })
  }

  openNew() {
    this.comment = new Comment();
    this.submitted = false;
    this.commentDialog = true;
  }

  editTrend(trend: Comment) {
    this.comment = { ...trend };
    this.commentDialog = true;
  }

  deleteTrend(trend: Comment) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + trend.name + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commetService.delete(trend._id).subscribe(res => {
          this.comments = this.comments.filter(val => val._id !== trend._id);
          this.comment = new Comment();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'הערה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.comment.name.trim()) {
      if (this.comment._id) {
        this.commetService.update(this.comment).subscribe(res => {
          this.comments[this.findIndexById(this.comment._id)] = this.comment;
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.commetService.save(this.comment).subscribe(res => {
          this.comments.push(res);
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.comments = [...this.comments];
    this.commentDialog = false;
    this.comment = new Comment();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.commentDialog = false;
    this.submitted = false;
  }


}
