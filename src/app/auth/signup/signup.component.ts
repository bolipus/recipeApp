import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { TrySignUpAction } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }


  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignUpAction({email, password}));
  }

}
