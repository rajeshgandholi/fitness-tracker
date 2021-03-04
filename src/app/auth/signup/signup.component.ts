import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide:boolean = true;
  maxDate: Date = new Date();
  constructor() { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
