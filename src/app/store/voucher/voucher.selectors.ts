import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VoucherState } from './voucher.reducer';
import { Voucher } from '../../features/voucher/voucher.model';

// 1. Selector root state 'vouchers'
export const selectVoucherState = createFeatureSelector<VoucherState>('vouchers');

// 2. Selector danh sách tất cả vouchers
export const selectAllVouchers = createSelector(
  selectVoucherState,
  (state: VoucherState) => state.vouchers
);

// 3. Selector theo trạng thái cụ thể
export const selectVouchersByStatus = (status: 'Available' | 'Used' | 'Expired') =>
  createSelector(selectAllVouchers, (vouchers: Voucher[]) =>
    vouchers.filter(v => v.status === status)
  );