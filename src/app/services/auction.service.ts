
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
 editAuction(id, body): Observable<any> {
    return this.apiService.put('auction/' + id, body);
  }
  deleteAuction(id): Observable<any> {
    return this.apiService.delete('auction/' + id);
  }
  setOrderFile(file): Observable<any> {
    return this.apiService.post('auction/orderFile', file);
  }
  getAllAuctions(): Observable<any> {
    return this.apiService.get('auction');
  }
  me(): Observable<any> {
    return this.apiService.get('api/auth/me');
  }
}
