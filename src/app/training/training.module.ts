import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingRouterModule } from './training-routing.module';
import { TrainingComponent } from './training.component';


@NgModule({
    declarations: [TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent],
    imports: [MatProgressSpinnerModule,
        SharedModule,
    TrainingRouterModule],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule{}
