import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from '../services/orders-service.service';
import { Order } from '../models/order';

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
  constructor(private service: OrdersServiceService) {
    
  }
  ngOnInit(): void {
    this.service.getByCompleted().subscribe({
      next: (orders) => {
        this.completedOrderList = orders
        this.isLoadingCompleted = false;
      },
      error: (errObj) => this.errorMsg = errObj.error.message
    });
    this.service.getByNotCompleted().subscribe({
      next: (orders) => {
        this.notCompletedOrderList = orders
        this.isLoadingNotCompleted = false;
      },
      error: (errObj) => this.errorMsg = errObj.error.message
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
}
