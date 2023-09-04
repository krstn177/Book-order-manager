import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ModalService } from '../services/modal.service';
import { OrdersServiceService } from '../services/orders-service.service';
import { Order } from '../models/order';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges{
  @Input() activeOrder : Order | null = null;
  @Output() update = new EventEmitter();

  regExpPhoneNumber = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  showAlert = false;
  alertMsg = 'Please wait! Updating order.';
  alertColor = 'primary';
  inSubmission = false;

  editForm = new FormGroup({
    _id: new FormControl('', {
      nonNullable: true
    }),
    firstName: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    lastName: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(3)
      ],
      nonNullable: true
    }),
    email: new FormControl('', {
      validators:[
        Validators.required,
        Validators.email
      ],
      nonNullable: true
    }),
    phoneNumber: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(this.regExpPhoneNumber)
      ],
      nonNullable: true
    }),
    address: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(5)
      ],
      nonNullable: true
    }),
    count: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]
    })
  });

  constructor(private modal: ModalService, private orderService: OrdersServiceService) { }

  ngOnInit(): void {
    this.modal.register('editOrder');
  }

  ngOnDestroy() {
    this.modal.unregister('editOrder');
  }

  ngOnChanges(){
    if (!this.activeOrder) {
      return
    }


    this.inSubmission = false;
    this.showAlert = false;
    this.editForm.controls._id.setValue(this.activeOrder._id as string);
    this.editForm.controls.firstName.setValue(this.activeOrder.firstName);
    this.editForm.controls.lastName.setValue(this.activeOrder.lastName);
    this.editForm.controls.email.setValue(this.activeOrder.email);
    this.editForm.controls.phoneNumber.setValue(this.activeOrder.phoneNumber);
    this.editForm.controls.count.setValue(this.activeOrder.count.toString());
    this.editForm.controls.address.setValue(this.activeOrder.address);
  }

  async submit(){
    if (!this.activeOrder) {
      return
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'primary';
    this.alertMsg = 'Please wait! Updating order.';

      this.orderService.updateOrder(
        this.editForm.controls._id.value,
        this.editForm.controls.firstName.value!,
        this.editForm.controls.lastName.value,
        this.editForm.controls.email.value,
        this.editForm.controls.address.value,
        this.editForm.controls.phoneNumber.value,
        Number(this.editForm.controls.count.value)
      ).subscribe({
        next: order => {
          setTimeout(() => {
            this.atSuccess();
          }, 1000);
          setTimeout(() => {
            this.modal.toggleModal('editOrder');
          }, 3000)
        },
        error: error => {
          this.inSubmission = false;
          this.alertColor = 'danger';
          this.alertMsg = 'Something went wrong. Try again later'
          console.log(error);
        }
      });  
  }
  atSuccess(){
    if (!this.activeOrder) {
      return
    }
    this.activeOrder.firstName = this.editForm.controls.firstName.value!;
    this.activeOrder.lastName = this.editForm.controls.lastName.value!;
    this.activeOrder.email = this.editForm.controls.email.value!;
    this.activeOrder.address = this.editForm.controls.address.value!;
    this.activeOrder.phoneNumber = this.editForm.controls.phoneNumber.value!;
    this.activeOrder.count = Number(this.editForm.controls.count.value!);

    this.update.emit(this.activeOrder);

    this.inSubmission = false;
    this.alertColor = 'success';
    this.alertMsg = 'Success';
  }
}
