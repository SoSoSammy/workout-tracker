import { Component, Input } from '@angular/core';

import { Goal } from '../../goal.model';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
})
export class GoalItemComponent {
  @Input() goal: Goal; // The goal passed in from the goal list component
  @Input() index: number; // The index of the goal passed in from the goal list component
}
