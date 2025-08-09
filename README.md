# Workout Tracker
<br />
<p align="center">
  <a href="http://sososammy.github.io/workout-tracker">
    <img width="1904" height="913" alt="image" src="https://github.com/user-attachments/assets/68f955c5-a519-4b5a-a867-8b342482ee27" />
  </a>

  <h3 align="center">Workout Tracker</h3>

  <p align="center">
    A workout tracker web app which allows users to track their workouts and fitness goals.
    <br />
    <a href="http://sososammy.github.io/workout-tracker"><strong>View Demo »</strong></a>
  </p>
</p>

## About the Project

You know how there are YouTube videos for workouts? Well, I was working out to some of those videos, and I would keep track of my workouts with a YouTube playlist. But I didn't like how I couldn't keep track of what days I worked out, and what videos I worked out to. That's what inspired me to create a workout tracker web application.

**Key Features:**
* Create, read, update, and delete workouts and fitness goals
* Store unlimited amount of YouTube videos associated with a workout
* Workouts and goals saved to browser local storage, saving application data so users can pick up where they left off

**A major challenge I overcame:** I was unsure of how to add an unlimited/undefined amount of YouTube videos for workouts. After researching, I implemented this feature by adding a new `FormControl` to my workout videos' `FormArray` each time the user clicks the button to add a new YouTube video. This makes it so the video form data changes dynamically when user adds/removes YouTube videos. I then transformed the YouTube video URLs from the user into YouTube embed URLs and displayed them on the webpage. However, I still had a big problem&mdash;my method of transforming these URLs into embed URLs did not check for possible cross-site scripting attacks. To fix this, I used a regular expression which described the format of a YouTube video. If the video URLs do not match this format, I display an alert to the user and do not add the workout data to the app.

### Built With

[![Angular][Angular-shield]][Angular-url]
[![TypeScript][TypeScript-shield]][TypeScript-url]
[![Bootstrap][Bootstrap-shield]][Bootstrap-url]

[Angular-shield]: https://img.shields.io/badge/Angular-0F0F11?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.dev
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[Bootstrap-shield]: https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
