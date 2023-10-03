import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
})
export class WorkoutEditComponent implements OnInit {
  id: number; // The id of workout to edit. NaN if no workout was selected
  editMode = false; // If the form is in edit mode
  workoutForm: FormGroup; // The workout form

  /**
   * Builds the workout edit component with its necessary services.
   *
   * @param route - the current route
   * @param router - the router
   * @param workoutService - the workout service
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  /**
   * Subscribes to changes in the URL parameters and sets the current id and edit mode to
   * reflect the url parameters. Calls the method initForm() to initialize the form values
   * with the correct values.
   */
  ngOnInit() {
    // Subscribe to changes in URL parameters
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      // Decide if we are in edit mode based on if id URL parameter is present
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  /**
   * Creates a form to add a new workout or edit an existing one.
   */
  private initForm() {
    // Set default workout values
    let workoutName = '';
    let workoutDate = null;
    let workoutType = '';
    let workoutDuration = '';
    let workoutVideos = new FormArray([]);
    let workoutNotes = '';

    // If in edit mode, set default workout values to workout passed in from URL
    if (this.editMode) {
      const workout = this.workoutService.getWorkout(this.id);
      workoutName = workout.name;
      workoutDate = workout.date;
      workoutType = workout.type;
      workoutDuration = workout.duration;
      workoutNotes = workout.notes;

      // If the workout has videos, create a new form control for each video
      if (workout.videos) {
        workout.videos.forEach((video) =>
          workoutVideos.push(new FormControl(video, Validators.required))
        );
      }
    }

    // Fill out the form controls with default values or values of workout from URL
    this.workoutForm = new FormGroup({
      name: new FormControl(workoutName, Validators.required),
      date: new FormControl(workoutDate, Validators.required),
      type: new FormControl(workoutType, Validators.required),
      duration: new FormControl(workoutDuration, Validators.required),
      videos: workoutVideos,
      notes: new FormControl(workoutNotes, Validators.required),
    });
  }

  /**
   * Gets the videos form controls (inputs) from the workout form.
   *
   * @returns the videos form controls
   */
  get controls() {
    return (<FormArray>this.workoutForm.get('videos')).controls;
  }

  /**
   * Deletes a specified video form control
   *
   * @param index - the index of the video form control
   */
  onDeleteVideo(index: number) {
    (<FormArray>this.workoutForm.get('videos')).removeAt(index);
  }

  /**
   * Adds a video form control to the workout form
   */
  onAddVideo() {
    (<FormArray>this.workoutForm.get('videos')).push(
      new FormControl(null, Validators.required)
    );
  }

  /**
   * Submits the form and updates the specified workout if the form is in edit mode,
   * and creates a new workout if not. Redirects up one level after submitting the form.
   */
  onSubmit() {
    // Editing a workout
    if (this.editMode)
      this.workoutService.updateWorkout(this.id, this.workoutForm.value);
    // Adding a new workout
    else this.workoutService.addWorkout(this.workoutForm.value);

    // Redirect up a level
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
