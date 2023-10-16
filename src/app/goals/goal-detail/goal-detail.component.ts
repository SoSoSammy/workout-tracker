import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
})
export class GoalDetailComponent implements OnInit {
  goal: Goal; // The current goal
  id: number; // The id of the current goal
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.goal = this.goalService.getGoal(this.id);
    });
  }

  onDeleteGoal() {}
}
