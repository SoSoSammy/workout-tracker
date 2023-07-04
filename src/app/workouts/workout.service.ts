import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Workout } from './workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  workoutsChanged = new Subject<Workout[]>();

  private workouts = [
    new Workout(
      'Upper Body Workout',
      '2023-07-04',
      'Upper Body',
      '45 minutes',
      [
        'https://www.youtube.com/watch?v=T7Mk9KBuhAU',
        'https://www.youtube.com/watch?v=t4n9VKZXV2E',
        'https://www.youtube.com/watch?v=7KSoWzbznhk',
      ],
      'Feeling stronger every day!'
    ),
    new Workout(
      'Lower Body Workout',
      '2023-07-04',
      'Lower Body',
      '40 minutes',
      [
        'https://www.youtube.com/watch?v=T7Mk9KBuhAU',
        'https://www.youtube.com/watch?v=Cq8xjqDLPKg',
        'https://www.youtube.com/watch?v=7KSoWzbznhk',
      ],
      'Feeling stronger every day!'
    ),
  ];

  getWorkouts() {
    return this.workouts.slice();
  }

  getWorkout(index: number) {
    return this.workouts[index];
  }

  updateWorkout(index: number, workout: Workout) {
    this.workouts[index] = workout;
    this.workoutsChanged.next(this.workouts.slice());
  }

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.workoutsChanged.next(this.workouts.slice());
  }
}
