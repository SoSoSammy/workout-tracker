import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-edit',
  templateUrl: './goal-edit.component.html',
})
export class GoalEditComponent implements OnInit, OnDestroy {
  id: number; // The id of goal to edit. NaN if no goal was selected
  editMode = false; // If the form is in edit mode
  goalForm: FormGroup; // The goal form
  subscription: Subscription; // The subscription to the route parameters

  /**
   * Builds the goal edit component with its necessary services.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService
  ) {}

  /**
   * Subscribes to changes in the route parameters and sets the current id and edit mode to
   * reflect the route parameters. Calls the method initForm() to initialize the form values
   * with the correct values.
   */
  ngOnInit() {
    // Subscribe to changes in URL parameters
    this.subscription = this.route.params.subscribe((params) => {
      this.id = +params.id;
      // Decide if we are in edit mode based on if id URL parameter is present
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  /**
   * Creates a form to add a new goal or edit an existing one.
   */
  private initForm() {
    // Set default goal values
    let goalName = '';
    let goalStartDate = '';
    let goalEndDate = '';
    let goalDescription = '';

    // If in edit mode, set default goal values to goal passed in from URL
    if (this.editMode) {
      const goal = this.goalService.getGoal(this.id);
      goalName = goal.name;
      goalStartDate = goal.startDate;
      goalEndDate = goal.endDate;
      goalDescription = goal.description;
    }

    // Create the goal form
    this.goalForm = new FormGroup({
      name: new FormControl(goalName, Validators.required),
      startDate: new FormControl(goalStartDate, Validators.required),
      endDate: new FormControl(goalEndDate),
      description: new FormControl(goalDescription, Validators.required),
    });
  }

  /**
   * Submits the form and updates the specified goal if the form is in edit mode,
   * and creates a new goal if not. Redirects up one level after submitting the form.
   */
  onSubmit() {
    // Editing a goal
    if (this.editMode)
      this.goalService.updateGoal(this.id, this.goalForm.value);
    // Adding a new goal
    else this.goalService.addGoal(this.goalForm.value);

    // Redirect up a level
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * Unsubscribes from the route parameters subscription when the component
   * is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
