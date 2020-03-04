import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TrySignUpAction, TRY_SIGNUP, SIGNUP, SET_TOKEN, TRY_SIGNIN, SIGNIN, LOGOUT} from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { pipe, from } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    pipe(
      map((action: TrySignUpAction) => {
        return action.payload;
      }),
      switchMap((authData: { email: string; password: string }) => {
        return from(
          firebase
            .auth()
            .createUserWithEmailAndPassword(authData.email, authData.password)
        );
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      pipe(
        mergeMap( (token: string) => {
            return [
              {
                type: SIGNUP
              },
              {
                type: SET_TOKEN,
                payload: token
              }
            ];
          }
        )
      )

    )
  );

  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    pipe(
      map((action: TrySignUpAction) => {
        console.log('TrySignIn');
        return action.payload;
      }),
      switchMap((authData: { email: string; password: string }) => {
        console.log('SignIn');
        return from(
          firebase
             .auth()
            .signInWithEmailAndPassword(authData.email, authData.password)
        );
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      pipe(
        mergeMap( (token: string) => {
            this.router.navigate(['/']);
            return [
              {
                type: SIGNIN
              },
              {
                type: SET_TOKEN,
                payload: token
              }
            ];
          }
        ),
      )

    )
  );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType(LOGOUT),
    pipe(
      tap( () => {
        console.log('logoutEffect');
        this.router.navigate(['/signin']);
      })
    )
  )

  constructor(private actions$: Actions, private router: Router) {}
}
