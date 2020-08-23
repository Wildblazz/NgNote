import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteListComponent} from './note-list/note-list.component';
import {EditNoteComponent} from './edit-note/edit-note.component';
import {ErrorComponent} from './error/error.component';
import {ShowNoteComponent} from './show-note/show-note.component';

const rotes: Routes = [
  {path: '', component: NoteListComponent},
  {path: 'edit/:id', component: EditNoteComponent},
  {path: 'show/:id', component: ShowNoteComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(rotes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
