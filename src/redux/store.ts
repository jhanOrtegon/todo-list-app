import { IAuth, IUi,  } from '@/interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uiSlice } from './slices';

export interface IAppStore {
    ui: IUi,
    auth: IAuth
    // todo: {},
}

export const store = configureStore({
  reducer:{
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    // todo: todoSlice.reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;