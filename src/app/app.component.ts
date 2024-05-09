import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Note {
  title: string;
  content: string;
  selected?: boolean;
}

@Component({
  selector    : 'app-root',
  standalone  : true,
  imports     : [
     RouterOutlet,
     FormsModule, 
     CommonModule],
  templateUrl : './app.component.html',
  styleUrl    : './app.component.css',
})
export class AppComponent {
  public TitleSize = 15;
  public DescSize = 50;
  public modelTitle = '';
  public modelNote = '';
  public notes: Note[] = [];
  public editingNote: Note | null = null;
  public editing = false;

  public processSaveNote() {
    if (this.modelTitle && this.modelNote) {
      const newNote: Note = {
        title: this.modelTitle,
        content: this.modelNote
      };
      this.notes.push(newNote);
      this.resetTempData();
    }
  }

  public selectNoteForEdit(note: Note) {
    this.editingNote = note;
    this.modelTitle = note.title;
    this.modelNote = note.content;
    this.editing=true;
  }
  public selectNote(note:Note){
    this.notes.forEach(n => n.selected = false);
    note.selected=true;
  }
  public processEdit() {
    if (this.editingNote) {
      this.editingNote.title = this.modelTitle;
      this.editingNote.content = this.modelNote;
      this.editingNote = null;
      this.editing=false;
      this.resetTempData();
    }
  }

  public deleteNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  private resetTempData() {
    this.modelTitle = '';
    this.modelNote = '';
  }
}