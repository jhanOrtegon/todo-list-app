import { AuthInitialState, IAuth } from '@/interfaces';
import { PayloadAction, createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    login: ( state, { payload }:PayloadAction<IAuth> ) => {
      state.status = 'authenticated', 
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = '';
    },
    logout: ( state, { payload }:PayloadAction<IAuth> ) => {
      state.status = 'not-authenticated',
      state.uid = '';
      state.email = '';
      state.displayName = '';
      state.photoURL = '';
      state.errorMessage = payload?.errorMessage as string;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

// STATUS
// 'checking', 'not-authenticated', 'authenticated'
export const { login, logout, checkingCredentials } = authSlice.actions;