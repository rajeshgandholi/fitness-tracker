import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  hide = true;
  maxDate: Date = new Date();
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor( private authService: AuthService, private uiService: UIService) {  }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubs)
    {this.loadingSubs.unsubscribe();
    }
  }
}
