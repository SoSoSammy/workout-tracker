import { Component, OnInit } from '@angular/core';

import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
})
export class GoalListComponent implements OnInit {
  goals: Goal[]; // The goals

  /**
   * Builds the goal list component with its necessary services.
   *
   * @param goalService - the goal service
   */
  constructor(private goalService: GoalService) {}

  /**
   * Initializes the goal list component with the goals from the
   * goal service.
   */
  ngOnInit() {
    this.goals = this.goalService.getGoals();
  }
}
