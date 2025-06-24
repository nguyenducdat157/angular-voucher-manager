import { createAction, props } from '@ngrx/store';

export const setLoading = createAction('[Common] Set Loading', props<{ loading: boolean }>());
export const setError = createAction('[Common] Set Error', props<{ error: string | null }>());
export const setSuccess = createAction('[Common] Set Success', props<{ message: string | null }>());
