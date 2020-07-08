import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signUpUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signInUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.token = token;
              console.log(token);
            }
          );

        }
      ) .catch (
        error => console.log(error)
      );
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

  getToken(){
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => {
        this.token = token;
        console.log(token);
      }
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}