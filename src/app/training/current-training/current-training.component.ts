import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { stopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer = 0;
  trainingName = '';
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.onStartOrStop();
  }

  // tslint:disable-next-line: typedef
  onStartOrStop(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.trainingName = this.trainingService.getRunningExercise().name;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100)
      {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  // tslint:disable-next-line: typedef
  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(stopTrainingComponent, {data: {progress: this.progress}});

    dialogRef.afterClosed().subscribe ( result => {
      if (result)
      {this.trainingService.cancelExercise(this.progress);
      }
      else {
      this.onStartOrStop();
      }
    });
  }



}
