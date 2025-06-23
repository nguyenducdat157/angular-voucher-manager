import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from 'src/app/features/voucher/voucher.model';
import { VoucherPageService } from './voucher-page.service';
import { Store } from '@ngrx/store';
import { selectLoading, selectError, selectSuccess } from 'src/app/store/voucher/voucher.selectors';

@Component({
  selector: 'app-voucher-page',
  templateUrl: './voucher-page.component.html',
  styleUrls: ['./voucher-page.component.scss']
})
export class VoucherPageComponent implements OnInit {
  vouchers$: Observable<Voucher[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  success$: Observable<string | null>;
  displayedColumns: string[] = ['code', 'description', 'expiryDate', 'status', 'actions'];
  get selectedStatus() {
    return this.voucherPageService.selectedStatus;
  }
  get selectedVoucher() {
    return this.voucherPageService.selectedVoucher;
  }

  constructor(public voucherPageService: VoucherPageService, private store: Store) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.success$ = this.store.select(selectSuccess);
  }

  ngOnInit(): void {
    this.voucherPageService.loadVouchers();
    this.updateVoucherList();
  }

  updateVoucherList(): void {
    this.vouchers$ = this.voucherPageService.getVouchers$();
  }

  onFilterChange(status: 'All' | 'Available' | 'Used' | 'Expired'): void {
    this.voucherPageService.setStatus(status);
    this.updateVoucherList();
  }

  markAsUsed(id: string): void {
    this.voucherPageService.markAsUsed(id);
  }

  deleteVoucher(id: string): void {
    this.voucherPageService.deleteVoucher(id);
  }

  editVoucher(voucher: Voucher): void {
    this.voucherPageService.editVoucher(voucher);
  }

  onSaveVoucher(voucher: Voucher): void {
    this.voucherPageService.saveVoucher(voucher);
    this.updateVoucherList();
  }

  onCancel(): void {
    this.voucherPageService.cancelEdit();
  }
}
