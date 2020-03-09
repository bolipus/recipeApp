import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { AddIngredients } from '../../shopping-list/store/shopping-list-actions';
import { RecipeFeatureState, RecipeState } from '../store/recipe.reducers';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeState>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private recipeStore: Store<RecipeFeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipeState = this.recipeStore.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.recipeStore.select('recipes').pipe(
      take(1)
    ).subscribe(
      (recipeState: RecipeState) => {
          this.store.dispatch(new AddIngredients(recipeState.recipes[this.id].ingredients));
      }
    )

  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeStore.dispatch(new DeleteRecipe({index: this.id}));
    this.router.navigate(['/recipes']);
  }
}
