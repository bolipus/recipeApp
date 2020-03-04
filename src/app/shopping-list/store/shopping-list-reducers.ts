import { Ingredient } from '../../shared/ingredient';
import { ShoppingListActions, ADD_INGREDIENT, ADD_INGREDIENTS, UPDATE_INGREDIENT, DELETE_INGREDIENT, START_EDIT, STOP_EDIT } from './shopping-list-actions';


export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ADD_INGREDIENTS:

      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: [...ingredients]
      };
    case DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: [...oldIngredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case START_EDIT:
      const ingredientToEdit = {...state.ingredients[action.payload.index]}
      return  {
        ...state,
        editedIngredient: ingredientToEdit,
        editedIngredientIndex: action.payload.index
      }
      case STOP_EDIT:
        return  {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        }
    default:
      return state;
  }
}
