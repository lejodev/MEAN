import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryComponent } from './modules/history/components/history.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { share } from 'rxjs';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TaskModalComponent } from './shared/components/modals/task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    // HistoryComponent,
    // TaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
