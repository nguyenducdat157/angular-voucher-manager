import { createAction, props } from '@ngrx/store';
import { Voucher } from '../../features/voucher/voucher.model';

export const loadVouchers = createAction('[Voucher] Load Vouchers');
export const loadVouchersSuccess = createAction('[Voucher] Load Success', props<{ vouchers: Voucher[] }>());
export const addVoucher = createAction('[Voucher] Add', props<{ voucher: Voucher }>());
export const updateVoucher = createAction('[Voucher] Update', props<{ voucher: Voucher }>());
export const deleteVoucher = createAction('[Voucher] Delete', props<{ id: string }>());
export const markAsUsed = createAction('[Voucher] Mark As Used', props<{ id: string }>());
export const checkExpired = createAction('[Voucher] Check Expired');

export const setLoading = createAction('[Voucher] Set Loading', props<{ loading: boolean }>());
export const setError = createAction('[Voucher] Set Error', props<{ error: string | null }>());
export const setSuccess = createAction('[Voucher] Set Success', props<{ message: string | null }>());
