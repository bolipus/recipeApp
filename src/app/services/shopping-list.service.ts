import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingridiensChanged = new Subject<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10)
  ];

  constructor() { }

  getIngridients(): Ingridient[]  {
    return this.ingridients.slice();
  }

  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridiensChanged.next(this.ingridients.slice());
  }

  addIngridients(ingridients: Ingridient[]) {
    this.ingridients.push(...ingridients);
    this.ingridiensChanged.next(this.ingridients.slice());
  }
}
