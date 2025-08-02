import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Workout } from './workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  workoutsChanged = new Subject<Workout[]>(); // For when the workouts are updated

  private workouts: Workout[] = []; // The workouts

  /**
   * Builds the workout service with the workouts from local
   * storage. If there is nothing stored in local storage,
   * workouts will be initialized to an empty array.
   */
  constructor() {
    this.workouts = this.getLocalStorage();
  }

  /**
   * Gets the workouts.
   *
   * @returns a copy of the workouts array
   */
  getWorkouts() {
    return this.workouts.slice();
  }

  /**
   * Gets a specified workout.
   *
   * @param index - the index of the workout
   * @returns the workout with the specified index
   */
  getWorkout(index: number) {
    return this.workouts[index];
  }

  /**
   * Takes a workout and updates it to the new workout. Updates
   * the workoutsChanged Subject with the new workouts array
   * and updates the browser local storage.
   *
   * @param index - the index of the workout to be updated
   * @param workout - the new workout
   */
  updateWorkout(index: number, workout: Workout) {
    this.workouts[index] = workout;
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage(this.workouts);
  }

  /**
   * Adds a workout to the workouts list. Updates the workoutsChanged
   * Subject with the new workouts array and updates the browser local
   * storage.
   *
   * @param workout - the new workout
   */
  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage(this.workouts);
  }

  /**
   * Deletes a specified workout once the user has confirmed the
   * deletion request. Updates the workoutsChanged Subject with the
   * new workouts array and updates the browser local storage.
   *
   * @param index - the index of the workout to be deleted
   */
  deleteWorkout(index: number) {
    if (confirm('Are you sure you want to delete this workout?'))
      this.workouts.splice(index, 1);
    this.workoutsChanged.next(this.workouts.slice());
    this.setLocalStorage(this.workouts);
  }

  /**
   * Gets the workouts stored in local storage.
   *
   * @returns the workouts retrieved from local storage, and an empty
   * array if there are no workouts
   */
  private getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workout-tracker-workouts'));

    if (!data) return [];

    return data;
  }

  /**
   * Sets the browser local storage with the current workouts.
   *
   * @param workouts - the workouts to be stored in local storage
   */
  private setLocalStorage(workouts: Workout[]) {
    localStorage.setItem('workout-tracker-workouts', JSON.stringify(workouts));
  }
}
