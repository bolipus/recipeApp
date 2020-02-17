import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingridients: Ingridient[] = [];

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingridients = this.shoppingListService.getIngridients();
    this.subscription = this.shoppingListService.ingridiensChanged.subscribe(
      (ingridients: Ingridient[]) => {
        this.ingridients = ingridients;
      }
    );
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }


}
