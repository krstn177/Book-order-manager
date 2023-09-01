import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from '../services/orders-service.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];
  errorMsg: string = '';
  isLoading: boolean = true;
  constructor(private service: OrdersServiceService) {
    
  }
  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (orders) => {
        this.orderList = orders
        this.isLoading = false;
      },
      error: (errObj) => this.errorMsg = errObj.error.message
    });
  }
}
