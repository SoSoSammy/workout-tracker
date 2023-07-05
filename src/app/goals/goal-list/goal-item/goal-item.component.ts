import { Component, Input } from '@angular/core';

import { Goal } from '../../goal.model';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
})
export class GoalItemComponent {
  @Input() goal: Goal;
  @Input() index: number;
}
