import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {ActivatedRoute, Params, Router, RouterLinkActive} from '@angular/router';
import {Note} from '../models/note';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.css']
})
export class ShowNoteComponent implements OnInit {

  note: Note;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>
      this.note = this.noteService.getNoteById(params.id)
    );
  }

  deleteNote(): void {
    this.noteService.removeNote(this.note);
    this.router.navigate(['/']);
  }
}
