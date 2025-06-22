import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllVouchers, selectVouchersByStatus } from 'src/app/store/voucher/voucher.selectors';
import * as VoucherActions from 'src/app/store/voucher/voucher.actions';
import { Voucher } from 'src/app/features/voucher/voucher.model';

@Component({
  selector: 'app-voucher-page',
  templateUrl: './voucher-page.component.html',
  styleUrls: ['./voucher-page.component.scss']
})
export class VoucherPageComponent implements OnInit {
  vouchers$: Observable<Voucher[]>;
  selectedStatus: 'All' | 'Available' | 'Used' | 'Expired' = 'All';
  displayedColumns: string[] = ['code', 'description', 'expiryDate', 'status', 'actions'];
  selectedVoucher: Voucher | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(VoucherActions.loadVouchers());
    this.updateVoucherList();
  }

  updateVoucherList(): void {
    if (this.selectedStatus === 'All') {
      this.vouchers$ = this.store.select(selectAllVouchers);
    } else {
      this.vouchers$ = this.store.select(selectVouchersByStatus(this.selectedStatus));
    }
  }

  onFilterChange(status: 'All' | 'Available' | 'Used' | 'Expired'): void {
    this.selectedStatus = status;
    this.updateVoucherList();
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

  onSaveVoucher(voucher: Voucher): void {
    if (this.selectedVoucher) {
      this.store.dispatch(VoucherActions.updateVoucher({ voucher }));
    } else {
      this.store.dispatch(VoucherActions.addVoucher({ voucher }));
    }
    this.selectedVoucher = null;
  }

  onCancel(): void {
    this.selectedVoucher = null;
  }
}
