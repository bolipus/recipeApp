import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    console.log('storeRecipe');
    this.http
      .put<{ name: string }>(
        'https://test-http-cefa0.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(),
        {
          observe: 'response'
        }
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://test-http-cefa0.firebaseio.com/recipes.json', {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        responseType: 'json'
      })
      .pipe(
        map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe.ingridients) {
              console.log(recipe);
              recipe.ingridients = [];
            }
          }
          return recipes;
        })
      ).subscribe( (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
