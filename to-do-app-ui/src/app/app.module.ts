import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToDosListComponent } from './to-dos/to-dos-list/to-dos-list.component';
import { ToDoItemComponent } from './to-dos/to-do-item/to-do-item.component';
import { ToDoIntegrationService } from './services/todo.integration.service';
import { ToDoTransformationService } from './services/todo.transformation.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ToDosListComponent,
    ToDoItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BootstrapSwitchModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ToDoIntegrationService, ToDoTransformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
