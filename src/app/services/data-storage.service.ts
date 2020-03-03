import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {

    this.http
      .put<{ name: string }>(
        'https://test-http-cefa0.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(),
        {
          observe: 'response',
         reportProgress: true
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
      .get<Recipe[]>(
        'https://test-http-cefa0.firebaseio.com/recipes.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          responseType: 'json',

          reportProgress: true

        }
      )
      .pipe(
        map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              console.log(recipe);
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
