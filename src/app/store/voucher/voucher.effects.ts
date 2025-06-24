import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as VoucherActions from './voucher.actions';
import { VoucherService } from 'src/app/features/voucher/voucher.service';
import { Store } from '@ngrx/store';
import * as CommonActions from 'src/app/store/common/common.actions';

@Injectable()
export class VoucherEffects {
  constructor(
    private actions$: Actions,
    private voucherService: VoucherService,
    private store: Store
  ) {}

  loadVouchers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.loadVouchers),
      switchMap(() => this.voucherService.getAll().pipe(
        map(vouchers => VoucherActions.loadVouchersSuccess({ vouchers }))
      ))
    )
  );

  addVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.addVoucher),
      mergeMap(({ voucher }) =>
        this.voucherService.addVoucher(voucher).pipe(
          mergeMap(() => [
            CommonActions.setSuccess({ message: 'Thêm voucher thành công!' }),
            VoucherActions.loadVouchers()
          ])
        )
      )
    )
  );

  updateVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.updateVoucher),
      mergeMap(({ voucher }) =>
        this.voucherService.updateVoucher(voucher).pipe(
          mergeMap(() => [
            CommonActions.setSuccess({ message: 'Cập nhật voucher thành công!' }),
            VoucherActions.loadVouchers()
          ])
        )
      )
    )
  );

  deleteVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.deleteVoucher),
      mergeMap(({ id }) =>
        this.voucherService.deleteVoucher(id).pipe(
          mergeMap(() => [
            CommonActions.setSuccess({ message: 'Xóa voucher thành công!' }),
            VoucherActions.loadVouchers()
          ])
        )
      )
    )
  );

  checkExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.loadVouchersSuccess),
      map(() => VoucherActions.checkExpired())
    )
  );
}
