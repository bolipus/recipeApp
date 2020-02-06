import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe';
import { Ingridient } from '../shared/ingridient';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Schnizel',
      'Nice',
      'https://bit.ly/2RfZEqS',
      [
        new Ingridient('Meat', 1),
        new Ingridient('French fries', 20)
      ]),
    new Recipe(
      'Burger',
      'Delicius',
      'https://bit.ly/2RfZEqS',
      [
        new Ingridient('Bread', 2),
        new Ingridient('Meat', 1),
        new Ingridient('Cheese', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  addIngridientsToShoppingList(ingridients: Ingridient[]) {
    this.shoppingListService.addIngridients(ingridients);
  }
}
