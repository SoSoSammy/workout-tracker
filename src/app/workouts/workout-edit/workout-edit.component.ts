import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
})
export class WorkoutEditComponent implements OnInit {
  id: number;
  editMode = false;
  workoutForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    // Subscribe to changes in URL parameters
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      // Decide if we are in edit mode based on if id URL parameter is present
      this.editMode = params.id != null;
      this.initForm();
    });
  }

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

  // Get workout video form controls
  get controls() {
    return (<FormArray>this.workoutForm.get('videos')).controls;
  }

  // Delete the specified video form control
  onDeleteVideo(index: number) {
    (<FormArray>this.workoutForm.get('videos')).removeAt(index);
  }

  // Add a video form control
  onAddVideo() {
    (<FormArray>this.workoutForm.get('videos')).push(
      new FormControl(null, Validators.required)
    );
  }

  onSubmit() {
    console.log(this.workoutForm);
  }
}
