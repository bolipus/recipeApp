import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { SET_RECIPES, FETCH_RECIPES, FetchRecipes, STORE_RECIPES, StoreRecipes } from './recipe.actions';
import { pipe } from 'rxjs';
import { DataStorageService } from '../../services/data-storage.service';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipe';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    pipe(
      switchMap((action: FetchRecipes) => {
        return (
          this.http.get<Recipe[]>(
            'https://test-http-cefa0.firebaseio.com/recipes.json',
            {
              headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
              responseType: 'json',
              reportProgress: true
            }
          )
        );
      }),
      map((recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            console.log(recipe);
            recipe.ingredients = [];
          }
        }
        return {
          type: SET_RECIPES,
          payload: recipes
        };
      })
    )
  );


  @Effect()
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),

  )
}
