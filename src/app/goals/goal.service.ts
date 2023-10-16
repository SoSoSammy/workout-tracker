import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Goal } from './goal.model';

@Injectable({ providedIn: 'root' })
export class GoalService {
  goalsChanged = new Subject<Goal[]>(); // For when the goals are updated

  private goals = [
    new Goal('Health Goal', '2023-01-01', '', 'Weigh 150 pounds'),
    new Goal('Workout Goal', '2023-07-01', '', 'Work out every day'),
    new Goal(
      'Nutrition Goal',
      '2023-07-01',
      '',
      'Eat 150 grams of protein daily'
    ),
    new Goal('Fitness Goal', '2021-07-01', '2023-05-03', 'Perform 1 pushup'),
  ];

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
}
