import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Workout } from './workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  workoutsChanged = new Subject<Workout[]>();

  private workouts: Workout[] = [];
  // private workouts = [
  //   new Workout(
  //     'Upper Body Workout',
  //     '2023-07-04',
  //     'Upper Body',
  //     '45 minutes',
  //     [
  //       'https://www.youtube.com/watch?v=T7Mk9KBuhAU',
  //       'https://www.youtube.com/watch?v=t4n9VKZXV2E',
  //       'https://www.youtube.com/watch?v=7KSoWzbznhk',
  //     ],
  //     'Feeling stronger every day!'
  //   ),
  //   new Workout(
  //     'Lower Body Workout',
  //     '2023-07-04',
  //     'Lower Body',
  //     '40 minutes',
  //     [
  //       'https://www.youtube.com/watch?v=T7Mk9KBuhAU',
  //       'https://www.youtube.com/watch?v=Cq8xjqDLPKg',
  //       'https://www.youtube.com/watch?v=7KSoWzbznhk',
  //     ],
  //     'Feeling stronger every day!'
  //   ),
  // ];

  constructor() {
    this.getLocalStorage();
  }

  getWorkouts() {
    return this.workouts.slice();
  }

  getWorkout(index: number) {
    return this.workouts[index];
  }

  updateWorkout(index: number, workout: Workout) {
    this.workouts[index] = workout;
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage();
  }

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage();
  }

  deleteWorkout(index: number) {
    if (confirm('Are you sure you want to delete this workout?'))
      this.workouts.splice(index, 1);
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage();
  }

  private getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.workouts = data;
  }

  private setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }
}
