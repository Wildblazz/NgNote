import {Injectable} from '@angular/core';
import {Note} from './models/note';
import {NOTE_LIST} from './common/constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public noteList: Array<Note>;

  constructor() {
  }

  initApp(): void {
    this.noteList = this.getNoteListFromLocalStorage();
  }

  getNoteListFromLocalStorage(): Array<Note> {
    let noteList = JSON.parse(localStorage.getItem(NOTE_LIST));
    if (!noteList) {
      noteList = Array<Note>();
    }
    noteList.forEach(note => note.date = new Date(Date.parse(note.date)));
    return noteList;
  }

  saveNoteListToLocalStorage(): void {
    localStorage.setItem(NOTE_LIST, JSON.stringify(this.noteList));
  }

  updateNote(note: Note): void {
    const oldNoteIndex = this.noteList.findIndex(oldNote => oldNote.id === note.id);
    this.noteList[oldNoteIndex] = note;
    this.saveNoteListToLocalStorage();
  }

  removeNote(note: Note): void {
    this.noteList = this.noteList.filter(value => value !== note);
    this.saveNoteListToLocalStorage();

  }

  getNoteById(id: string): Note {
    return this.noteList.find(value => value.id === id);
  }

  getStandartForm(title = '', text = ''): FormGroup {
    return new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),

      ]),
      text: new FormControl(text, [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }
}
