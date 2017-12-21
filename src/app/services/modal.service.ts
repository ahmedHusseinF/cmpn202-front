import { Component, ViewChild, ElementRef } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header {{type}}">
      <h5 class="modal-title pull-left ">{{title|capitalizeFirst}}</h5>
      <button style="margin-top:-35px;" type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div *ngIf="input" class="modal-body form-group">
      <input #bodyInput [(ngModel)]="input_value" name="input_value" style="width:100%; padding: 5px;
      font-size:16px;">
    </div>
    <div class="modal-footer" style="padding: 15px !important;">
      <button type="button" class="btn btn-lg pull-right" (click)="bsModalRef.hide()">OK</button>
    </div>
  `
})
export class ModalContentComponent {
  @ViewChild('bodyInput') inputTag: ElementRef;
  public title;
  public type;
  public input;
  public input_value;

  constructor(public bsModalRef: BsModalRef) { }
  ngAfterViewInit() {
    if (this.input)
      for (let obj of this.input) {
        this.inputTag.nativeElement.setAttribute(Object.keys(obj)[0],
          obj[Object.keys(obj)[0]]);
      }
    delete this.input;
  }
}