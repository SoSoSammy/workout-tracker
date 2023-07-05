import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goal-edit',
  templateUrl: './goal-edit.component.html',
})
export class GoalEditComponent {
  editMode = false;

  onSubmit(goalForm: NgForm) {
    console.log(goalForm.value);
  }
}
