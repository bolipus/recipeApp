import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe';
import { Ingridient } from '../../shared/ingridient';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +(params.id);
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(){

    let recipeName = '';
    let imagePath = '';
    let description = '';


    if (this.editMode){
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingridients){
        for(const ingridient of recipe.ingridients){
          this.recipeIngidients.push(new FormGroup({
            name: new FormControl(ingridient.name, Validators.required),
            amount: new FormControl(ingridient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingridients: this.recipeIngidients
    });
  }

  onAddIngridient(){
    (this.recipeForm.get('ingridients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit() {
   /* const recipeIngridients: Ingridient[] = [];
    for (const ingridient of this.recipeForm.value.ingridients ) {
      recipeIngridients.push(new Ingridient(ingridient.value.name, ingridient.value.amount));
    }*/
   /* const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingridients);*/

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngridient(index: number){
    (this.recipeForm.get('ingridients') as FormArray).removeAt(index);
  }

}
