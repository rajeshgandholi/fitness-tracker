import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  exerciseSubscription!: Subscription;
  loadingSubscription!: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (      isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    // valueChanges();
    // .subscribe(result => console.log(result));
    // console.log(this.exercises);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.isLoading = false;
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises(): void{
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void{
    if (this.exerciseSubscription){
    this.exerciseSubscription.unsubscribe(); }
    if (this.loadingSubscription){
    this.loadingSubscription.unsubscribe();
  }
}
}
