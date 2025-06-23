import { createReducer, on } from '@ngrx/store';
import { Voucher } from '../../features/voucher/voucher.model';
import * as VoucherActions from './voucher.actions';

export interface VoucherState {
  vouchers: Voucher[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: VoucherState = {
  vouchers: [],
  loading: false,
  error: null,
  success: null
};

const _voucherReducer = createReducer(
  initialState,
  on(VoucherActions.setLoading, (state, { loading }) => ({ ...state, loading })),
  on(VoucherActions.setError, (state, { error }) => ({ ...state, error })),
  on(VoucherActions.setSuccess, (state, { message }) => ({ ...state, success: message })),
  on(VoucherActions.loadVouchersSuccess, (state, { vouchers }) => ({ ...state, vouchers, loading: false, error: null })),
  on(VoucherActions.addVoucher, (state) => ({ ...state, loading: true, error: null })),
  on(VoucherActions.updateVoucher, (state) => ({ ...state, loading: true, error: null })),
  on(VoucherActions.deleteVoucher, (state) => ({ ...state, loading: true, error: null })),
  on(VoucherActions.markAsUsed, (state) => ({ ...state, loading: true, error: null })),
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
