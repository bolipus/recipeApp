import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngridients(): Ingredient[]  {
    return this.ingredients.slice();
  }

  getIngridient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngridient(ingridient: Ingredient) {
    this.ingredients.push(ingridient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngridients(ingridients: Ingredient[]) {
    this.ingredients.push(...ingridients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngridient(index: number, newIngridient: Ingredient){
    this.ingredients[index] = newIngridient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngridient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
