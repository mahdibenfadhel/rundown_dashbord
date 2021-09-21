
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(private apiService: ApiService) {
  }

  setAuctionFile(file): Observable<any> {
    return this.apiService.post('auction/file', file);
  }
  setOrderFile(file): Observable<any> {
    return this.apiService.post('auction/orderFile', file);
  }
  me(): Observable<any> {
    return this.apiService.get('api/auth/me');
  }
}
