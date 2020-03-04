import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'try_signup';

export const TRY_SIGNIN = 'try_signin';


export const SIGNIN = 'signin';

export const SIGNUP = 'signup';

export const LOGOUT = 'logout';

export const SET_TOKEN = 'set_token';

export class SignInAction implements Action {
  readonly type = SIGNIN;
}

export class TrySignInAction implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignUpAction implements Action {
  readonly type = SIGNUP;
}

export class TrySignUpAction implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { email: string; password: string }) {}
}

export class LogOutAction implements Action {
  readonly type = LOGOUT;
}

export class SetTokenAction implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignInAction
  | SignUpAction
  | LogOutAction
  | SetTokenAction
  | TrySignUpAction
  | TrySignInAction;
