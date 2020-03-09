import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe';
import { RecipeFeatureState, RecipeState } from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngidients: FormArray = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeStore: Store<RecipeFeatureState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';

    if (this.editMode) {
      this.recipeStore.select('recipes').pipe(
        take(1)
      ).subscribe(
        (recipeState: RecipeState) => {
          const recipe: Recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          if (recipe.ingredients) {
            for (const ingridient of recipe.ingredients) {
              this.recipeIngidients.push(
                new FormGroup({
                  name: new FormControl(ingridient.name, Validators.required),
                  amount: new FormControl(ingridient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        }
      );

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: this.recipeIngidients
    });
  }

  onAddIngridient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeStore.dispatch(new UpdateRecipe({ index: this.id, recipe: this.recipeForm.value }));
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeStore.dispatch(new AddRecipe(this.recipeForm.value));
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngridient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
