import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout; // The current workout
  id: number; // The id of the current workout
  videoUrls: SafeResourceUrl[]; // An array of YouTube embed URLs

  /**
   * Builds the workout detail component with its necessary services.
   *
   * @param workoutService - the workout service
   * @param route - the current route
   * @param router - the router
   * @param sanitizer - the DOM sanitizer (used on links)
   */
  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Subscribes to changes in the URL parameters and sets the current id and workout to
   * reflect the url parameters. Calls the transformUrlsToEmbedUrls() method to transform
   * YouTube video URLs to a YouTube embed URL.
   */
  ngOnInit() {
    // Subscribe to changes in URL parameters
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.workout = this.workoutService.getWorkout(this.id);
      this.videoUrls = this.transformUrlsToEmbedUrls(this.workout.videos);
    });
  }

  /**
   * Takes an array of YouTube video URLs, removes the URL parameters, and formats the URLs as
   * YouTube embed URLs.
   *
   * @param videos - the array of YouTube video URLs
   * @returns the transformed array of video URLs, with URL parameters removed and formatted as
   * a YouTube embed URL
   */
  transformUrlsToEmbedUrls(videos: string[]) {
    // Create a new array of video URLs
    let videoUrls = videos.map((url) => {
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

    // Return the newly created video urls
    return videoUrls;
  }

  /**
   * Deletes the current workout and navigates to main workouts page.
   */
  onDeleteWorkout() {
    this.workoutService.deleteWorkout(this.id);
    this.router.navigate(['/workouts']);
  }
}
