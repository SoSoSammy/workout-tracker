import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './workouts/workouts.component';
import { GoalsComponent } from './goals/goals.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutStartComponent } from './workouts/workout-start/workout-start.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    children: [
      { path: '', component: WorkoutStartComponent },
      { path: 'new', component: WorkoutEditComponent },
      { path: ':id', component: WorkoutDetailComponent },
      { path: ':id/edit', component: WorkoutEditComponent },
    ],
  },
  { path: 'goals', component: GoalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
