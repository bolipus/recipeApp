import { RecipeActions, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, ADD_RECIPES } from './recipe.actions';
import { Recipe } from '../recipe';
import { Ingredient } from 'src/app/shared/ingredient';


export interface RecipeFeatureState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes : [
    new Recipe('Schnizel', 'Nice', 'https://bit.ly/2RfZEqS', [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20)
    ]),
    new Recipe('Burger', 'Delicius', 'https://bit.ly/2RfZEqS', [
      new Ingredient('Bread', 2),
      new Ingredient('Meat', 1),
      new Ingredient('Cheese', 1)
    ])
  ]
};

export function recipeReducer(
  state: RecipeState = initialState,
  action: RecipeActions
) {
  switch(action.type){
    case ADD_RECIPE:

    case ADD_RECIPES:

    case UPDATE_RECIPE:

    case DELETE_RECIPE:

    default:
      return state;

  }
}
