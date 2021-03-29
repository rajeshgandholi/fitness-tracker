import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

export class AuthService {
    authChange = new Subject<boolean>();
    private user = {} as User | null;
    // private user = <User>{};
    // private user: User = {
    //     email: '',
    //     userId: ''
    // };

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authChange.next(true);
    }

    // tslint:disable-next-line: typedef
    logOut() {
        this.user = null;
        this.authChange.next(false);
    }


    // tslint:disable-next-line: typedef
    getUser() {
        return { ...this.user };
    }

    // tslint:disable-next-line: typedef
    isAuth() {
        return (this.user != null);
    }
}
