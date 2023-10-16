import { Component, Input } from '@angular/core';

import { Workout } from '../../workout.model';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
})
export class WorkoutItemComponent {
  @Input() workout: Workout; // The workout passed in from the workout list component
  @Input() index: number; // the index of the workout passed in from the workout list component
}
