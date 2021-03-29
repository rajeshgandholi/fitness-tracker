import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter;
  progress = 0;
  timer = 0;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onStartOrStop();
  }

  // tslint:disable-next-line: typedef
  onStartOrStop(){
    this.timer = setInterval(() => {
      this.progress = this.progress + 25;
      if (this.progress >= 100)
      {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  // tslint:disable-next-line: typedef
  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(stopTrainingComponent, {data: {progress: this.progress}});

    dialogRef.afterClosed().subscribe ( result => {
      if (result)
      {this.trainingExit.emit();
      }
      else {
      this.onStartOrStop();
      }
    });
  }



}
