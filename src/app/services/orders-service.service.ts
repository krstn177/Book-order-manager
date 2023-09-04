import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Order } from '../models/order'; 
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  orders: Order[] = [];
  constructor(private http: HttpClient, private auth: AuthService) { }
  token = this.auth.getToken();
  headerDict = {
    'Content-Type': 'application/json',
    'X-Authorization': this.token
  }
  
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict),
  };

  headerReSetter() {
    this.token = this.auth.getToken();
    this.headerDict = {
      'Content-Type': 'application/json',
      'X-Authorization': this.token
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }
  
  getByCompleted() {
    this.headerReSetter();
    const reqOptionsQuery = {...this.requestOptions, params: new HttpParams().set('where', 'isCompleted=true')};
    return this.http.get<Order[]>('api/orders', reqOptionsQuery);
  }

  getByNotCompleted() {
    this.headerReSetter();
    const reqOptionsQuery = {...this.requestOptions, params: new HttpParams().set('where', 'isCompleted=false')};
    return this.http.get<Order[]>('api/orders', reqOptionsQuery);
  }

  getOrders() {
    return this.http.get<Order[]>('api/orders', this.requestOptions);
  }

  completeOrder(id: string) {
    return this.http.get<any>(`api/orders/${id}/complete`, this.requestOptions);
  }

  updateOrder(id: string, firstName: string, lastName: string, email: string, address: string, phoneNumber: string, count: number) {
    const order = {
      _id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      count: count
    }

    return this.http.put<any>(`api/orders/${id}`, JSON.stringify(order), this.requestOptions);
  }

  deleteOrder(id: string) {
    return this.http.delete<any>(`api/orders/${id}`, this.requestOptions);
  }

}
