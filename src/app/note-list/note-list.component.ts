import {Component, Injectable, OnInit} from '@angular/core';
import {Note} from '../models/note';
import {NOTE_LIST, STATE_ACTIVE, STATE_COMPLETED} from '../common/constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})

export class NoteListComponent implements OnInit {

  constructor(private notesService: NotesService) {
  }

  state: string;
  addNoteForm: FormGroup;
  currentDate: Date;
  currentNoteId: string;

  ngOnInit(): void {
    this.currentDate = new Date(Date.now());
    this.addNoteForm = this.notesService.getStandartForm();
  }

// work with note list
  addNote(): void {
    if (this.addNoteForm.valid) {
      this.state = '';
      const newNote = new Note(
        Date.now().toString(), STATE_ACTIVE, this.addNoteForm.value.title.trim(), this.addNoteForm.value.text.trim(), this.currentDate);
      this.notesService.noteList.unshift(newNote);
      this.addNoteForm.reset();
    }
    this.notesService.saveNoteListToLocalStorage();
  }

  removeNote(note: Note): void {
   this.notesService.removeNote( note);
  }

// change type of rendered notes
  completeNote(note: Note): void {
    note.state = note.state === STATE_ACTIVE ? STATE_COMPLETED : STATE_ACTIVE;
    this.notesService.saveNoteListToLocalStorage();
  }

  getActiveNotes(): Array<Note> {
    const activeNotes = this.notesService.noteList.filter(note => note.state === STATE_ACTIVE && this.dateFilter(note));
    return activeNotes ? activeNotes : Array<Note>();

  }

// filtering notes by status(for button block and ngFor)
  getFilteredNotes(state?: string): Array<Note> {
    if (!state) {
      this.state = '';
      return this.notesService.noteList.filter(note => this.dateFilter(note));
    } else if (state === STATE_ACTIVE) {
      this.state = STATE_ACTIVE;
      return this.notesService.noteList.filter(note => note.state === STATE_ACTIVE && this.dateFilter(note));
    } else {
      this.state = STATE_COMPLETED;
      return this.notesService.noteList.filter(note => note.state === STATE_COMPLETED && this.dateFilter(note));
    }
  }

// suppliers
  dateFilter(note: Note): boolean {
    return note.date.toLocaleDateString() === this.currentDate.toLocaleDateString();
  }

  setCurrentDate(): void {
    this.currentDate = new Date();
  }

  setDate(event): void {
    this.currentDate = new Date(Date.parse(event.target.value));
  }
}


