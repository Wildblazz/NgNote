import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NotesService} from '../notes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Note} from '../models/note';
import {AppRoutingModule} from '../app-routing.module';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  editNoteForm: FormGroup;
  note: Note;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.note = this.noteService.getNoteById(params.id);
      this.editNoteForm = this.noteService.getStandartForm(this.note.title, this.note.text);
    });
  }

  saveNote(): void {
    this.note.title = this.editNoteForm.value.title;
    this.note.text = this.editNoteForm.value.text;
    this.noteService.updateNote(this.note);
    this.router.navigate(['/']);
  }

  resetForm(): void {
    this.editNoteForm = this.noteService.getStandartForm(this.note.title, this.note.text);
  }
}
