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
  token = this.auth.getToken() || '';
  headerDict = {
    'Content-Type': 'application/json',
    'X-Authorization': this.token
  }
  
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict),
  };

  getByCompleted() {
    const reqOptionsQuery = Object.assign(this.requestOptions, {params: new HttpParams().set('where', 'isCompleted=true')});
    return this.http.get<Order[]>('api/orders', reqOptionsQuery);
  }

  getByNotCompleted() {
    const reqOptionsQuery = Object.assign(this.requestOptions, {params: new HttpParams().set('where', 'isCompleted=false')});
    return this.http.get<Order[]>('api/orders', reqOptionsQuery);
  }

  getOrders() {
    return this.http.get<Order[]>('api/orders', this.requestOptions);
  }

  completeOrder(id: string) {
    return this.http.get<any>(`api/orders/${id}/complete`, this.requestOptions);
  }

}
