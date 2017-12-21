import { Component } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'deposite-purchase',
  templateUrl: './deposite-purchase.component.html',
  styleUrls: ['./deposite-purchase.component.css']
})
export class DepositePurchase {
  data: any;
  confirmForm: FormGroup;
  bsmodel: BsModalRef;
  constructor(public bsModalRef: BsModalRef, private formbuilder: FormBuilder) {
    this.initForm();
  }

  public confirm(valid, value, modal) {
    modal.hide();
    return this.confirmApi(value.Mpin, this.data.checkSenderRes);
  }

  public confirmApi: Function;

  initForm() {
    let formvalidationCode = {
      Mpin: ['', [<any>Validators.required]],
    }

    this.confirmForm = this.formbuilder.group(formvalidationCode)
  }

  ngOnDestroy() {
    delete this.data;
    delete this.confirmForm;
  }

}