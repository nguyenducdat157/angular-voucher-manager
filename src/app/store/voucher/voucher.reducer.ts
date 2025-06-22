import { createReducer, on } from '@ngrx/store';
import { Voucher } from '../../features/voucher/voucher.model';
import * as VoucherActions from './voucher.actions';

export interface VoucherState {
  vouchers: Voucher[];
}

const initialState: VoucherState = {
  vouchers: []
};

const _voucherReducer = createReducer(
  initialState,
  on(VoucherActions.loadVouchersSuccess, (state, { vouchers }) => ({ ...state, vouchers })),
  on(VoucherActions.addVoucher, (state, { voucher }) => ({ ...state, vouchers: [...state.vouchers, voucher] })),
  on(VoucherActions.updateVoucher, (state, { voucher }) => ({
    ...state,
    vouchers: state.vouchers.map(v => v.id === voucher.id ? voucher : v)
  })),
  on(VoucherActions.deleteVoucher, (state, { id }) => ({
    ...state,
    vouchers: state.vouchers.filter(v => v.id !== id)
  })),
  on(VoucherActions.markAsUsed, (state, { id }) => ({
    ...state,
    vouchers: state.vouchers.map(v => v.id === id ? { ...v, status: 'Used' } : v)
  })),
  on(VoucherActions.checkExpired, (state) => {
    const now = new Date();
    return {
      ...state,
      vouchers: state.vouchers.map(v => ({
        ...v,
        status: (v.status === 'Available' && new Date(v.expiryDate) < now) ? 'Expired' : v.status
      }))
    };
  }),
);

export function voucherReducer(state, action) {
  return _voucherReducer(state, action);
}
