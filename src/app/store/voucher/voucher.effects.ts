import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import * as VoucherActions from './voucher.actions';
import { Store } from '@ngrx/store';
import { VoucherState } from './voucher.reducer';
import { selectAllVouchers } from './voucher.selectors';
import { VoucherService } from 'src/app/features/voucher/voucher.service';

@Injectable()
export class VoucherEffects {
  constructor(
    private actions$: Actions,
    private voucherService: VoucherService,
    private store: Store<VoucherState>
  ) {}

  // Load vouchers từ localStorage
  loadVouchers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.loadVouchers),
      map(() => {
        const vouchers = this.voucherService.getAll();
        return VoucherActions.loadVouchersSuccess({ vouchers });
      })
    )
  );

  // Lưu lại danh sách mỗi khi thay đổi
  persistVouchers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        VoucherActions.addVoucher,
        VoucherActions.updateVoucher,
        VoucherActions.deleteVoucher,
        VoucherActions.markAsUsed,
        VoucherActions.checkExpired
      ),
      withLatestFrom(this.store.select(selectAllVouchers)),
      tap(([action, vouchers]) => {
        this.voucherService.saveAll(vouchers);
      })
    ),
    { dispatch: false } // không trả ra action mới
  );

  // Thêm mới: gọi checkExpired sau khi load thành công
  checkExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.loadVouchersSuccess),
      map(() => VoucherActions.checkExpired())
    )
  );
}
