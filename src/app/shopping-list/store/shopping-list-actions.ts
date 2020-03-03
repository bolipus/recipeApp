import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';


export const ADD_INGRIDIENT = 'add_ingridient';

export class AddIngridient implements Action {
  readonly type = ADD_INGRIDIENT;
  constructor(public payload: Ingredient) {}
}

export type ShoppingListActions = AddIngridient;
