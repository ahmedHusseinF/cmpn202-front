import { Injectable } from '@angular/core';
//modal
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from "./modal.service";
import { DepositePurchase } from "../modals/deposit-purchase/deposit-purchase.component";

@Injectable()
export class GlobalVariablesService {
  constructor(private modalService: BsModalService) { }

  private subscribtions: any = [];
  bsModalRef: BsModalRef;
  public current_balance;
  walletId;

  unSubscribe(subscribtion?) {
    if (subscribtion)
      return this.subscribtions.push(subscribtion);
    this.subscribtions.forEach(s => s.unsubscribe());
    this.subscribtions = [];
  }

  public showModal(msg: string, type: string = 'success', size: string = 'md',
    input: object[] = null) {

    msg = msg ? msg : 'Something went wrong, please try again later'

    ModalContentComponent.prototype.title = msg
    ModalContentComponent.prototype.type = type;
    if (input) {
      ModalContentComponent.prototype.input = input;
    }
    this.bsModalRef = this.modalService.show(ModalContentComponent,
      { class: `modal-${size}` });

    if (input) return this.modalService.onHide.map(res => {
      let modal_input = ModalContentComponent.prototype.input_value;
      delete ModalContentComponent.prototype.input_value;
      return res == null && modal_input ? modal_input : null;
    });
  }

  showMpinConfirm(data, apiSubscFunc) {
    DepositePurchase.prototype.data = data;
    DepositePurchase.prototype.confirmApi = apiSubscFunc;
    this.bsModalRef = this.modalService.show(DepositePurchase);
  }

  update(name: string, value) {
    this[name] = value;
    localStorage.setItem(name, value);
  }

  public getAction(actionName: string) {
    let parent = localStorage.getItem('parent');
    if(parent==='true')
      return true;
    let merch_action = localStorage.getItem('merchantActions');
    if(!merch_action || merch_action==='undefined')
      return false;
    let actions = JSON.parse(localStorage.getItem('merchantActions'));

    if (actions[actionName])
      return true;
    
    return false;
  }

  getActions(actions: string[]) {
    let parent = localStorage.getItem('parent');
    if(parent==='true')
      return true;
    let actionState = false;
    for (let action of actions) {
      actionState = actionState || this.getAction(action);
    }

    return actionState;
  }

  get(name: string) {
    if (this[name]) return this[name];
    this[name] = localStorage.getItem(name);
    return this[name];
  }


}
