import { ShoppingListState, shoppingListReducer } from '../shopping-list/store/shopping-list-reducers';
import { AuthState, authReducer } from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}


export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
}
