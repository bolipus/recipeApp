import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingridiensChanged = new Subject<Ingridient[]>();

startedEditing = new Subject<number>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10)
  ];

  constructor() { }

  getIngridients(): Ingridient[]  {
    return this.ingridients.slice();
  }

  getIngridient(index: number): Ingridient {
    return this.ingridients[index];
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridiensChanged.next(this.ingridients.slice());
  }

  addIngridients(ingridients: Ingridient[]) {
    this.ingridients.push(...ingridients);
    this.ingridiensChanged.next(this.ingridients.slice());
  }

  updateIngridient(index: number, newIngridient: Ingridient){
    this.ingridients[index] = newIngridient;
    this.ingridiensChanged.next(this.ingridients.slice());
  }

  deleteIngridient(index: number) {
    this.ingridients.splice(index, 1);
    this.ingridiensChanged.next(this.ingridients.slice());
  }
}
