import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private apiService: ApiService) {
  }

  getOrders(): Observable<any> {
    return this.apiService.get('order/allOrders');
  }
  getOrdersById(userId): Observable<any> {
    return this.apiService.get('order/getOrdersByUser/' + userId);
  }
getOrdersSinceYesterday(): Observable<any> {
    return this.apiService.get('order/allOrdersSinceYesterday');
  }
getOrdersChart(): Observable<any> {
    return this.apiService.get('order/ordersChart');
  }
delete0rder(id): Observable<any> {
    return this.apiService.delete('order/' + id);
  }

}
