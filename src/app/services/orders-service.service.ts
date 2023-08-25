import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order'; 

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  orders: Order[] = [];
  constructor(private http: HttpClient) { }
  getOrders() {
    const token = ''; //to be added logic
    const headerDict = {
      'Content-Type': 'application/json',
      'X-Authorization': token
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<Order[]>('api/orders', requestOptions);
  }
}
