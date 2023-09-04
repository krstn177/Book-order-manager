import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from '../services/orders-service.service';
import { Order } from '../models/order';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  completedOrderList: Order[] = [];
  notCompletedOrderList: Order[] = [];
  errorMsg: string = '';
  isLoadingCompleted: boolean = true;
  isLoadingNotCompleted: boolean = true;
  activeOrder: Order | null = null;

  constructor(private service: OrdersServiceService, private modal: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.service.getByCompleted().subscribe({
      next: (orders) => {
        this.completedOrderList = orders
        this.isLoadingCompleted = false;
      },
      error: async (errObj) => {
        this.errorMsg = errObj.error.message
        console.log(errObj.error.message);
        if (errObj.error.message == 'Use an account') {
          await this.router.navigateByUrl('/login')
        }
      }
    });
    
    this.service.getByNotCompleted().subscribe({
      next: (orders) => {
        this.notCompletedOrderList = orders
        this.isLoadingNotCompleted = false;
      },
      error: async (errObj) => {
        this.errorMsg = errObj.error.message
        console.log(errObj.error.message);
        if (errObj.error.message == 'Use an account') {
          await this.router.navigateByUrl('/login')
        }
      }
    });
  }

  completeOrder(id: string){
    const order = this.notCompletedOrderList.find(o => o._id === id);
    if (order) {
      const orderIndex = this.notCompletedOrderList.indexOf(order);
      this.service.completeOrder(id).subscribe({
        next: () => {
          this.notCompletedOrderList.splice(orderIndex, 1)
          this.completedOrderList.push(order);
          console.log('success');
          console.log(order._id);
        },
        error: (errObj) => this.errorMsg = errObj.error.message
      })  
    }
  }

  openEditModal(order: Order){
    this.activeOrder = order;

    this.modal.toggleModal('editOrder');
  }

  openDeleteModal(order: Order){
    this.activeOrder = order;

    this.modal.toggleModal('deleteOrder');
  }

  deleteOrderEv($event: Order){
    const orderNotComplete = this.notCompletedOrderList.find(o => o._id === $event._id);
    const orderComplete = this.completedOrderList.find(o => o._id === $event._id);
    console.log('emitted');

    if (orderNotComplete) {
      console.log(orderNotComplete);
      const orderIndex = this.notCompletedOrderList.indexOf(orderNotComplete);
      this.notCompletedOrderList.splice(orderIndex, 1);
    } else if (orderComplete){
      console.log(orderComplete);
      const orderIndex = this.completedOrderList.indexOf(orderComplete);
      this.completedOrderList.splice(orderIndex, 1);
    }
  }

  update($event: Order){
    let orderNotComplete = this.notCompletedOrderList.find(o => o._id === $event._id);
    let orderComplete = this.notCompletedOrderList.find(o => o._id === $event._id);

    if (orderNotComplete) {
      orderNotComplete.firstName = $event.firstName;
      orderNotComplete.lastName = $event.lastName;
      orderNotComplete.email = $event.email;
      orderNotComplete.address = $event.address;
      orderNotComplete.phoneNumber = $event.phoneNumber;
      orderNotComplete.count = $event.count;

    } else if(orderComplete){
      orderComplete.firstName = $event.firstName;
      orderComplete.lastName = $event.lastName;
      orderComplete.email = $event.email;
      orderComplete.address = $event.address;
      orderComplete.phoneNumber = $event.phoneNumber;
      orderComplete.count = $event.count;
    }
  }
}
