import { Injectable } from '@angular/core';
import { Voucher } from './voucher.model';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private localKey = 'vouchers';

  getAll(): Voucher[] {
    const data = localStorage.getItem(this.localKey);
    return data ? JSON.parse(data) : [];
  }

  saveAll(vouchers: Voucher[]) {
    localStorage.setItem(this.localKey, JSON.stringify(vouchers));
  }
}
