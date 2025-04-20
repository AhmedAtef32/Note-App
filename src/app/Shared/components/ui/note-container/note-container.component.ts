import { Component, EventEmitter, input, InputSignal, Output, output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { Note } from '../../../interfaces/note';
import { DatePipe } from '@angular/common';
import { NotesService } from '../../../services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-note-container',
  imports: [SpeedDial, ToastModule , DatePipe],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css',
  providers: [MessageService]

})
export class NoteContainerComponent {
  items!: MenuItem[] | null; ;
  note:InputSignal<Note> = input.required()
  index:InputSignal<number> = input.required()

  colorsNotes:string[] = ['#DBE689','#F4C16D' ,'#8A6FBF' ,'#00CCF4']
 colorIndex:number = Math.floor(Math.random() * this.colorsNotes.length)
  constructor(private messageService: MessageService ,  private notesService:NotesService , private toastrService : ToastrService) {}

  ngOnInit() {
      this.items = [
          {
              icon: 'pi pi-pencil',
              command: () => {
              }
          },
          {
            icon: 'pi pi-eye',
            command: () => {
              console.log(this.colorIndex)
            }
        },
          {
              icon: 'pi pi-trash',
              command: () => {
                this.onfireEvent();
                this.toastrService.success('Note deleted successfully');
                this.deleteNote(this.note()._id)
              }
          }
      ];
  }


 @Output() itemEvent:EventEmitter<string> = new EventEmitter();
 onfireEvent(){
  this.itemEvent.emit(this.index().toString());
 }


 deleteNote(id:string){
  this.notesService.deleteNote(id).subscribe({
    next:(res)=>{
    },error:(err)=>{

    }
  })


 }


}
