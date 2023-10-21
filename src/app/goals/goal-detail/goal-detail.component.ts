import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
})
export class GoalDetailComponent implements OnInit, OnDestroy {
  goal: Goal; // The current goal
  id: number; // The id of the current goal
  subscription: Subscription; // The subscription to the route parameters

  /**
   * Builds the goal detail component with its necessary services.
   *
   * @param route - the current route
   * @param router - the router
   * @param goalService - the goal service
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService
  ) {}

  /**
   * Subscribes to changes in the route parameters and sets the current id and goal to
   * reflect the route parameters.
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.goal = this.goalService.getGoal(this.id);
    });
  }

  onDeleteGoal() {
    this.goalService.deleteGoal(this.id);
    this.router.navigate(['/goals']);
  }

  /**
   * Unsubscribes from the route parameters subscription when the component
   * is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
