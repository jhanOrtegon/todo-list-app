export const AuthInitialState = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  errorMessage: '',
  status: 'checking'
};

export type IAuthState = 'checking' | 'not-authenticated' | 'authenticated'

export interface IAuth {
  uid: string ,
  displayName: string,
  email: string,
  photoURL: string,
  errorMessage?: string,
  status: IAuthState
}
