import {
  RecipeActions,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  ADD_RECIPES,
  SET_RECIPES
} from './recipe.actions';
import { Recipe } from '../recipe';
import { Ingredient } from 'src/app/shared/ingredient';

export interface RecipeFeatureState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
  //editedRecipe: Ingredient;
  //editedRecipeIndex: number;
}

const initialState: RecipeState = {
  recipes: [
    new Recipe('Schnizel', 'Nice', 'https://bit.ly/2RfZEqS', [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20)
    ]),
    new Recipe('Burger', 'Delicius', 'https://bit.ly/2RfZEqS', [
      new Ingredient('Bread', 2),
      new Ingredient('Meat', 1),
      new Ingredient('Cheese', 1)
    ])
  ],
  //editedRecipe: null,
  //editedRecipeIndex: -1
};

export function recipeReducer(
  state: RecipeState = initialState,
  action: RecipeActions
) {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.payload };

    case ADD_RECIPE:
      console.log('Recipe:' + action.payload);
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case ADD_RECIPES:
      return {
        ...state,
        recipes: [state.recipes, action.payload],
        editedRecipe: null,
        editedRecipeIndex: -1
      };
    case UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.recipe,
       // editedRecipe: null,
       // editedRecipeIndex: -1
      };
      const newRecipes = [...state.recipes];
      newRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: newRecipes
      };
    case DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload.index, 1);
      return {
        ...state,
        recipes: [...oldRecipes],
        editedRecipe: null,
        editedRecipeIndex: -1
      };
    default:
      return state;
  }
}
