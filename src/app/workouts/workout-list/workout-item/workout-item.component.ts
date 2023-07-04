import { Component, Input, OnInit } from '@angular/core';

import { Workout } from '../../workout.model';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
})
export class WorkoutItemComponent implements OnInit {
  @Input() workout: Workout;
  @Input() index: number;

  ngOnInit() {
    console.log(this.index);
  }
}
