import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes(){
    console.log('storeRecipe');
    this.http.put<{ name: string }>(
      'https://test-http-cefa0.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        observe: 'response'
      }
    ).subscribe( response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(
      'https://test-http-cefa0.firebaseio.com/recipes.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        responseType: 'json'
      }).subscribe( recipes => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
