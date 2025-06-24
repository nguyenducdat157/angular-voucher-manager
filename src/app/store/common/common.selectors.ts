import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>('common');

export const selectLoading = createSelector(
  selectCommonState,
  (state: CommonState) => state.loading
);

export const selectError = createSelector(
  selectCommonState,
  (state: CommonState) => state.error
);

export const selectSuccess = createSelector(
  selectCommonState,
  (state: CommonState) => state.success
);
