import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voucher } from './voucher.model';
import { API_BASE_URL } from 'src/app/core/tokens/app.tokens';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private readonly endpoint = '/vouchers';
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {}

  getAll(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.baseUrl + this.endpoint);
  }

  addVoucher(voucher: Voucher): Observable<Voucher> {
    return this.http.post<Voucher>(this.baseUrl + this.endpoint, voucher);
  }

  updateVoucher(voucher: Voucher): Observable<Voucher> {
    return this.http.put<Voucher>(`${this.baseUrl + this.endpoint}/${voucher.id}`, voucher);
  }

  deleteVoucher(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl + this.endpoint}/${id}`);
  }
}
