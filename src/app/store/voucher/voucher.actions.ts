import { createAction, props } from '@ngrx/store';
import { Voucher } from '../../features/voucher/voucher.model';

export const loadVouchers = createAction('[Voucher] Load Vouchers');
export const loadVouchersSuccess = createAction('[Voucher] Load Success', props<{ vouchers: Voucher[] }>());
export const addVoucher = createAction('[Voucher] Add', props<{ voucher: Voucher }>());
export const updateVoucher = createAction('[Voucher] Update', props<{ voucher: Voucher }>());
export const deleteVoucher = createAction('[Voucher] Delete', props<{ id: string }>());
export const markAsUsed = createAction('[Voucher] Mark As Used', props<{ id: string }>());
export const checkExpired = createAction('[Voucher] Check Expired');
