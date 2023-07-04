import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts: Workout[];
  subscription: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // When workouts array changes, reflect change in workout list
    this.subscription = this.workoutService.workoutsChanged.subscribe(
      (workouts: Workout[]) => {
        this.workouts = workouts;
      }
    );
    this.workouts = this.workoutService.getWorkouts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
