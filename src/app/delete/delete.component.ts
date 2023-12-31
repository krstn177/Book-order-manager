import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Order } from '../models/order';
import { OrdersServiceService } from '../services/orders-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy{
  @Input() activeOrder: Order | null = null;
  @Output() deleteOrderEv = new EventEmitter();

  showAlert = false;
  alertMsg = 'Please wait! Updating order.';
  alertColor = 'primary';
  disableButton = false;
  inSubmission = false;
  modId = 'deleteOrder'

  constructor(private modal: ModalService, private orderService: OrdersServiceService) { }

  ngOnInit(): void {   
    this.modal.register(this.modId);
  }

  ngOnDestroy() {
    this.modal.unregister(this.modId);
  }

  closeModal() {
    this.modal.toggleModal(this.modId);
  }

  deleteOrder() {
    if (!this.activeOrder) {
      return
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.disableButton = true;
    this.alertColor = 'primary';
    this.alertMsg = 'Please wait! Updating order.';

    this.orderService.deleteOrder(this.activeOrder._id).subscribe({
      next: order => {
        setTimeout(() => {
          this.deleteOrderEv.emit(this.activeOrder);
  
          this.alertColor = 'success';
          this.alertMsg = 'Success';
          this.inSubmission = false;
        }, 1000);
        setTimeout(()=>{
          this.showAlert = false;
          this.alertMsg = 'Please wait! Updating order.';
          this.alertColor = 'primary';
          this.inSubmission = false;
          this.modal.toggleModal(this.modId);
          this.disableButton = false;
        }, 2000);
      },
      error: err => {
        this.inSubmission = false;
        this.alertColor = 'danger';
        this.alertMsg = 'Oops! Something went wrong!';
        console.log(err);
        setTimeout(() => {
          this.showAlert = false;
          this.alertMsg = 'Please wait! Updating order.';
          this.alertColor = 'primary';
          this.modal.toggleModal(this.modId);
          this.disableButton = false;
        }, 2000)
      }
    })
  }
}
