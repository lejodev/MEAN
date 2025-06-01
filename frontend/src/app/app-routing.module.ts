import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import * as path from 'path';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "", component: LayoutComponent,
    children: [{
      path: "", component: DashboardComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
