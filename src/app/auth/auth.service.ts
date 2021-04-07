import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
// import { User } from './user.model';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    // private user = {} as User | false;
    // private user!: User;
    // private user = <User>{};
    // private user: User = {
    //     email: '',
    //     userId: ''
    // };
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService) { }

    registerUser(authData: AuthData): any {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 1000).toString()
        // };
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result: any) => {
                this.uiService.loadingStateChanged.next(false);
            })
            .catch((error: any) => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000);
                // this.snackBar.open(error.message, null, {
                //     duration: 3000
                // });
            });
    }

    login(authData: AuthData): void {
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 1000).toString()
        // };
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then((result: any) => {
                this.uiService.loadingStateChanged.next(false);
            })
            .catch((error: any) => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000);
                // this.snackBar.open(error.message, null, {
                //     duration: 3000
                // });
            });
    }

    logOut(): void {
        this.afAuth.auth.signOut();
        // this.trainingService.cancelSubscription();
        // this.authChange.next(false);
        // this.router.navigate(['/login']);
        // this.isAuthenticated = false;
    }

    initAuthListener(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscription();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    isAuth(): boolean {
        return this.isAuthenticated;
        // return (false);
    }

    // private successfully(): any {
    //     // this.isAuthenticated = true;
    //     // this.authChange.next(true);
    //     // this.router.navigate(['/training']);
    // }
}
