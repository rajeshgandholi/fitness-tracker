import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
// import { TrainingModule } from './training/training.module';
import { TrainingRouterModule } from './training/training-routing.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    // TrainingModule,
    TrainingRouterModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
