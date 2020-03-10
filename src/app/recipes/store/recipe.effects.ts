import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { SET_RECIPES, FETCH_RECIPES, FetchRecipes, STORE_RECIPES, StoreRecipes } from './recipe.actions';
import { pipe, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Recipe } from '../recipe';
import { RecipeFeatureState, RecipeState } from './recipe.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<RecipeFeatureState>
  ) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    pipe(
      switchMap((action: FetchRecipes) => {
        return this.http.get<Recipe[]>(
          'https://test-http-cefa0.firebaseio.com/recipes.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            responseType: 'json',
            reportProgress: true
          }
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


  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]: [StoreRecipes, RecipeState]) => {
        return this.http
          .put<{ name: string }>(
            'https://test-http-cefa0.firebaseio.com/recipes.json',
            state.recipes,
            {
              observe: 'response',
              reportProgress: true
            }
          );
      })
    )
  )
}
