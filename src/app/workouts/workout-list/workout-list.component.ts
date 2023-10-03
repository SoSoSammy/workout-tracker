import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts: Workout[]; // The workouts from the workout service
  subscription: Subscription; // The subscription to the workout service

  constructor(private workoutService: WorkoutService) {}

  /**
   * Subscribes to changes from the workout service and updates the workouts
   * accordingly.
   */
  ngOnInit() {
    // When workouts array changes, reflect change in workout list
    this.subscription = this.workoutService.workoutsChanged.subscribe(
      (workouts: Workout[]) => {
        this.workouts = workouts;
      }
    );
    this.workouts = this.workoutService.getWorkouts();
  }

  /**
   * Unsubscribes from the workout service subscription when the component
   * is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
