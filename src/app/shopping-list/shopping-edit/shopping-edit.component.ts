import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingridient } from '../../shared/ingridient';
import { element } from 'protractor';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  @Output() ingridientAdded = new EventEmitter<Ingridient>();

  constructor() { }

  ngOnInit() {
  }

  addIngridient(){
    console.log("addIngridient:" + this.nameInput.nativeElement.value + " (" + this.amountInput.nativeElement.value+")");
    this.ingridientAdded.emit(new Ingridient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}