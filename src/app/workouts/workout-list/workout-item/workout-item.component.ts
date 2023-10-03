import { Component, Input, OnInit } from '@angular/core';

import { Workout } from '../../workout.model';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
})
export class WorkoutItemComponent implements OnInit {
  @Input() workout: Workout; // The workout passed in from the workout list
  @Input() index: number; // the index of the workout passed in from the workout list

  ngOnInit() {
    console.log(this.index);
  }
}
