import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';

export const ADD_INGREDIENT = 'add_ingredient';
export const UPDATE_INGREDIENT = 'update_ingredient';
export const DELETE_INGREDIENT = 'delete_ingredient';

export const ADD_INGREDIENTS = 'add_ingredients';

export const START_EDIT = 'startEdit';
export const STOP_EDIT = 'stopEdit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: { index: number }) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
