import { AuthActions, SIGNIN, SIGNUP, LOGOUT, SET_TOKEN } from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer (
  state: AuthState = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP: {
      return {
        ...state,
        authenticated: true
      };
    }
    case LOGOUT: {
      return {
        ...state,
        token: null,
        authenticated: false
      };
    }

    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
