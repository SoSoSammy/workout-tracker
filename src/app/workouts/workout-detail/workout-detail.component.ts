import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;
  id: number;
  videoUrls;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Subscribe to changes in URL parameters
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.workout = this.workoutService.getWorkout(this.id);
      this.transformUrlsToEmbedUrls();
    });
  }

  // Change YouTube urls to iframe embed urls
  transformUrlsToEmbedUrls() {
    this.videoUrls = this.workout.videos.map((url) => {
      const videoId = url.slice(32);
      console.log(videoId);
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    });
    console.log(this.videoUrls);
  }
}
