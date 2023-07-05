import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './workouts/workouts.component';
import { GoalsComponent } from './goals/goals.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutStartComponent } from './workouts/workout-start/workout-start.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { GoalStartComponent } from './goals/goal-start/goal-start.component';
import { GoalEditComponent } from './goals/goal-edit/goal-edit.component';
import { GoalDetailComponent } from './goals/goal-detail/goal-detail.component';

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
  {
    path: 'goals',
    component: GoalsComponent,
    children: [
      { path: '', component: GoalStartComponent },
      { path: 'new', component: GoalEditComponent },
      { path: ':id', component: GoalDetailComponent },
      { path: ':id/edit', component: GoalEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
