import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import * as VoucherActions from './voucher.actions';
import { VoucherService } from 'src/app/features/voucher/voucher.service';
import { Store } from '@ngrx/store';

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
      switchMap(() => [
        VoucherActions.setLoading({ loading: true })
      ])
    )
  );

  loadVouchersApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.setLoading),
      switchMap(() =>
        this.voucherService.getAll().pipe(
          map(vouchers => VoucherActions.loadVouchersSuccess({ vouchers })),
          catchError(error => of(
            VoucherActions.setError({ error: 'Lỗi tải danh sách voucher!' }),
            VoucherActions.setLoading({ loading: false })
          ))
        )
      )
    )
  );

  addVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.addVoucher),
      tap(() => this.store.dispatch(VoucherActions.setLoading({ loading: true }))),
      mergeMap(({ voucher }) =>
        this.voucherService.addVoucher(voucher).pipe(
          mergeMap(() => [
            VoucherActions.setSuccess({ message: 'Thêm voucher thành công!' }),
            VoucherActions.setLoading({ loading: false }),
            VoucherActions.loadVouchers()
          ]),
          catchError(() => of(
            VoucherActions.setError({ error: 'Lỗi thêm voucher!' }),
            VoucherActions.setLoading({ loading: false })
          ))
        )
      )
    )
  );

  updateVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.updateVoucher),
      tap(() => this.store.dispatch(VoucherActions.setLoading({ loading: true }))),
      mergeMap(({ voucher }) =>
        this.voucherService.updateVoucher(voucher).pipe(
          mergeMap(() => [
            VoucherActions.setSuccess({ message: 'Cập nhật voucher thành công!' }),
            VoucherActions.setLoading({ loading: false }),
            VoucherActions.loadVouchers()
          ]),
          catchError(() => of(
            VoucherActions.setError({ error: 'Lỗi cập nhật voucher!' }),
            VoucherActions.setLoading({ loading: false })
          ))
        )
      )
    )
  );

  deleteVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoucherActions.deleteVoucher),
      tap(() => this.store.dispatch(VoucherActions.setLoading({ loading: true }))),
      mergeMap(({ id }) =>
        this.voucherService.deleteVoucher(id).pipe(
          mergeMap(() => [
            VoucherActions.setSuccess({ message: 'Xóa voucher thành công!' }),
            VoucherActions.setLoading({ loading: false }),
            VoucherActions.loadVouchers()
          ]),
          catchError(() => of(
            VoucherActions.setError({ error: 'Lỗi xóa voucher!' }),
            VoucherActions.setLoading({ loading: false })
          ))
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
