import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllVouchers, selectVouchersByStatus } from 'src/app/store/voucher/voucher.selectors';
import * as VoucherActions from 'src/app/store/voucher/voucher.actions';
import { Voucher } from 'src/app/features/voucher/voucher.model';

@Injectable({ providedIn: 'root' })
export class VoucherPageService {
  selectedStatus: 'All' | 'Available' | 'Used' | 'Expired' = 'All';
  selectedVoucher: Voucher | null = null;

  constructor(private store: Store) {}

  loadVouchers(): void {
    this.store.dispatch(VoucherActions.loadVouchers());
  }

  getVouchers$(): Observable<Voucher[]> {
    if (this.selectedStatus === 'All') {
      return this.store.select(selectAllVouchers);
    } else {
      return this.store.select(selectVouchersByStatus(this.selectedStatus));
    }
  }

  setStatus(status: 'All' | 'Available' | 'Used' | 'Expired') {
    this.selectedStatus = status;
  }

  markAsUsed(id: string): void {
    this.store.dispatch(VoucherActions.markAsUsed({ id }));
  }

  deleteVoucher(id: string): void {
    this.store.dispatch(VoucherActions.deleteVoucher({ id }));
  }

  editVoucher(voucher: Voucher): void {
    this.selectedVoucher = { ...voucher };
  }

  saveVoucher(voucher: Voucher): void {
    if (this.selectedVoucher) {
      this.store.dispatch(VoucherActions.updateVoucher({ voucher }));
    } else {
      this.store.dispatch(VoucherActions.addVoucher({ voucher }));
    }
    this.selectedVoucher = null;
  }

  cancelEdit(): void {
    this.selectedVoucher = null;
  }
}
