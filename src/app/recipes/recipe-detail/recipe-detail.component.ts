import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(+(this.route.snapshot.params.id));

    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+(params.id));
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngridientsToShoppingList(this.recipe.ingridients);
  }

}
