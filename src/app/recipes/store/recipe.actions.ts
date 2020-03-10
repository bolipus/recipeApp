import { Action } from '@ngrx/store';
import { Recipe } from '../recipe';

export const SET_RECIPES = 'set_recipes';

export const ADD_RECIPE = 'add_recipe';
export const UPDATE_RECIPE = 'update_recipe';
export const DELETE_RECIPE = 'delete_recipe';
export const ADD_RECIPES = 'add_recipes';

export const STORE_RECIPES = 'store_recipes';
export const FETCH_RECIPES = 'fetch_recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: {index: number}) {}
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | AddRecipes
  | UpdateRecipe
  | DeleteRecipe
  | FetchRecipes
  | StoreRecipes;
