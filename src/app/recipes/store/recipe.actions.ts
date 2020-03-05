import { Action } from '@ngrx/store';
import { Recipe } from '../recipe';

export const ADD_RECIPE = 'add_recipe';
export const UPDATE_RECIPE = 'update_recipe';
export const DELETE_RECIPE = 'delete_recipe';
export const ADD_RECIPES = 'add_recipes';

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
  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
}

export type RecipeActions =
  | AddRecipe
  | AddRecipes
  | UpdateRecipe
  | DeleteRecipe;
