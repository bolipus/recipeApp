import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {

  recipeSelected: Recipe;

  constructor() { }

  ngOnInit() {

  }
}
