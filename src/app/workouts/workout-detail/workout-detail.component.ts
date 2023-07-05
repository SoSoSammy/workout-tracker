import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router,
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
      let videoId = url.slice(32);
      // Get rid of URL parameters in URL
      if (videoId.includes('&')) {
        // Only get the beginning of the string and the characters before the &
        videoId = videoId.substring(0, videoId.indexOf('&'));
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    });
  }

  onDeleteWorkout() {
    this.workoutService.deleteWorkout(this.id);
    this.router.navigate(['/workouts']);
  }
}
