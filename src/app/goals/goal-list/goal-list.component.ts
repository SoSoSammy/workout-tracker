import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
})
export class GoalListComponent implements OnInit {
  goals: Goal[]; // The goals
  subscription: Subscription; // The subscription to the goal service

  /**
   * Builds the goal list component with its necessary services.
   *
   * @param goalService - the goal service
   */
  constructor(private goalService: GoalService) {}

  /**
   * Subscribes to changes from the goal service and updates the goals
   * accordingly.
   */
  ngOnInit() {
    this.subscription = this.goalService.goalsChanged.subscribe(
      (goals: Goal[]) => {
        this.goals = goals;
      }
    );
    this.goals = this.goalService.getGoals();
  }
}
