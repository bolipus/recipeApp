import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list-actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngridient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log('OnAddItem');
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.shoppingListService.updateIngridient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngridient(newIngredient));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onReset() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editedItemIndex) {
      this.shoppingListService.deleteIngridient(this.editedItemIndex);
    }
    this.onReset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
