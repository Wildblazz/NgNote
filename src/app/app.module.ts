import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoteListComponent} from './note-list/note-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditNoteComponent} from './edit-note/edit-note.component';
import {AppRoutingModule} from './app-routing.module';
import {NotesService} from './notes.service';
import {ShowNoteComponent} from './show-note/show-note.component';
import {ErrorComponent} from './error/error.component';


export function appInit(notesService: NotesService): object {
  return () => notesService.initApp();
}

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    ShowNoteComponent,
    EditNoteComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [NotesService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [NotesService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
