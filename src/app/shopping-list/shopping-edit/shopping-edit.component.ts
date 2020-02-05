import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingridient } from '../../shared/ingridient';
import { element } from 'protractor';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngridient() {
    console.log('addIngridient:' + this.nameInput.nativeElement.value + ' (' + this.amountInput.nativeElement.value + ')');
    this.shoppingListService.addIngridient(new Ingridient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}
