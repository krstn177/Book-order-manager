import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from '../services/orders-service.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = []
  constructor(private service: OrdersServiceService) {
    
  }
  ngOnInit(): void {
    this.service.getOrders().subscribe(orders => {
      this.orderList = orders
    });
  }
}
