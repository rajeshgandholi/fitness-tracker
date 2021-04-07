import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) =>
    {
      this.dataSource.data = exercises;
      // console.log('🚀 ~ file: past-trainings.component.ts ~ line 28 ~ PastTrainingsComponent ~ ngOnInit ~ exercises', exercises);
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
    // console.log(this.dataSource.data);
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void{
    // console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // tslint:disable-next-line: no-unused-expression
    // console.log(this.dataSource.data.find( value => {value.name; }, 'burpees'));

  }

  ngOnDestroy(): void{
    if (this.exChangedSubscription){
    this.exChangedSubscription.unsubscribe(); }
  }

}
