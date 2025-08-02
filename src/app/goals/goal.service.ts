import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Goal } from './goal.model';

@Injectable({ providedIn: 'root' })
export class GoalService {
  goalsChanged = new Subject<Goal[]>(); // For when the goals are updated

  private goals: Goal[] = []; // The goals

  /**
   * Builds the goal service with the goals from local
   * storage. If there is nothing stored in local storage,
   * goals will be initialized to an empty array.
   */
  constructor() {
    this.goals = this.getLocalStorage();
  }

  /**
   * Gets the goals.
   *
   * @returns a copy of the goals array
   */
  getGoals() {
    return this.goals.slice();
  }

  /**
   * Gets a specified goal.
   *
   * @param index - the index of the goal
   * @returns the goal with the specified index
   */
  getGoal(index: number) {
    return this.goals[index];
  }

  /**
   * Takes a goal and updates it to the new goal. Updates
   * the goalsChanged Subject with the new goals array
   * and updates the browser local storage.
   *
   * @param index - the index of the goal to be updated
   * @param goal - the new goal
   */
  updateGoal(index: number, goal: Goal) {
    this.goals[index] = goal;
    this.goalsChanged.next(this.goals.slice());
    this.setLocalStorage(this.goals);
  }

  /**
   * Adds a goal to the goals list. Updates the goalsChanged
   * Subject with the new goals array and updates the browser local
   * storage.
   *
   * @param goal - the new goal
   */
  addGoal(goal: Goal) {
    this.goals.push(goal);
    this.goalsChanged.next(this.goals.slice());
    this.setLocalStorage(this.goals);
  }

  /**
   * Deletes a specified goal once the user has confirmed the
   * deletion request. Updates the goalsChanged Subject with the
   * new goals array and updates the browser local storage.
   *
   * @param index - the index of the goal to be deleted
   */
  deleteGoal(index: number) {
    if (confirm('Are you sure you want to delete this goal?'))
      this.goals.splice(index, 1);
    this.goalsChanged.next(this.goals.slice());
    this.setLocalStorage(this.goals);
  }

  /**
   * Gets the goals stored in local storage.
   *
   * @returns the goals retrieved from local storage, and an empty
   * array if there are no goals
   */
  private getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workout-tracker-goals'));

    if (!data) return [];

    return data;
  }

  /**
   * Sets the browser local storage with the current goals.
   *
   * @param goals - the goals to be stored in local storage
   */
  private setLocalStorage(goals: Goal[]) {
    localStorage.setItem('workout-tracker-goals', JSON.stringify(goals));
  }
}
