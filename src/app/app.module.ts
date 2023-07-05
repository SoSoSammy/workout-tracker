import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { WorkoutItemComponent } from './workouts/workout-list/workout-item/workout-item.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { GoalItemComponent } from './goals/goal-list/goal-item/goal-item.component';
import { GoalEditComponent } from './goals/goal-edit/goal-edit.component';
import { WorkoutStartComponent } from './workouts/workout-start/workout-start.component';
import { GoalStartComponent } from './goals/goal-start/goal-start.component';
import { GoalDetailComponent } from './goals/goal-detail/goal-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutItemComponent,
    WorkoutDetailComponent,
    WorkoutEditComponent,
    WorkoutStartComponent,
    GoalsComponent,
    GoalListComponent,
    GoalItemComponent,
    GoalDetailComponent,
    GoalEditComponent,
    GoalStartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
