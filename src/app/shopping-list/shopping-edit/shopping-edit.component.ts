import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducers';
import { ShoppingListState } from '../store/shopping-list-reducers';
import { AddIngredient, UpdateIngredient, DeleteIngredient, StopEdit } from '../store/shopping-list-actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  editMode = false;
  editedItem: Ingredient;

  subcription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subcription = this.store.select('shoppingList').subscribe(
      (data: ShoppingListState) => {
        if (data.editedIngredientIndex > -1 ){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.store.dispatch(new UpdateIngredient({ ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onReset() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onReset();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

}
