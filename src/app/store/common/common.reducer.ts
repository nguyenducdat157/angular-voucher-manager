import { createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.actions';

export interface CommonState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

export const initialCommonState: CommonState = {
  loading: false,
  error: null,
  success: null
};

export const commonReducer = createReducer(
  initialCommonState,
  on(CommonActions.setLoading, (state, { loading }) => ({ ...state, loading })),
  on(CommonActions.setError, (state, { error }) => ({ ...state, error })),
  on(CommonActions.setSuccess, (state, { message }) => ({ ...state, success: message })),
);
