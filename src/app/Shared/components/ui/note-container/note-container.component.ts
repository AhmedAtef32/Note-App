import { Component, ElementRef, EventEmitter, inject, input, InputSignal, Output, output, ViewChild, viewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { Note } from '../../../interfaces/note';
import { DatePipe } from '@angular/common';
import { NotesService } from '../../../services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-container',
  imports: [SpeedDial, ToastModule ,ReactiveFormsModule, DatePipe,Dialog , ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css',
  providers: [MessageService]

})
export class NoteContainerComponent {
  items!: MenuItem[] | null; ;
  note:InputSignal<Note> = input.required()
  index:InputSignal<number> = input.required()
  visible: boolean = false;
  visibleUpdate: boolean = false;
  @ViewChild('card') card!:ElementRef
  @Output() itemEvent:EventEmitter<string> = new EventEmitter();
  constructor(private messageService: MessageService ,  private notesService:NotesService , private toastrService : ToastrService  ) {}

 private formBuilder = inject(FormBuilder)
    updateNoteForm:FormGroup = this.formBuilder.group({
    title: [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) ]],
    content : [null , [Validators.required , Validators.minLength(10) , Validators.maxLength(100) ]]
    })
  ngOnInit() {
      this.items = [
          {
              icon: 'pi pi-pencil',
              command: () => {
            this.visibleUpdateform();
            this.patchvalueInform();
              }
          },
          {
            icon: 'pi pi-eye',
            command: () => {
              this.showDialog();
            }
        },
          {
              icon: 'pi pi-trash',
              command: () => {
                this.toastrService.success('Note deleted successfully');
                this.deleteNote(this.note()._id)
                this.card.nativeElement.classList.add('animate__zoomOut')
                this.card.nativeElement.classList.remove('min-h-[200px]')
                setTimeout(() => {
                  this.onfireEvent()
                },300);
              }
          }
      ];
  }


  visibleUpdateform() {
      this.visibleUpdate = true;
  }

  onfireEvent() {
    this.itemEvent.emit(this.index().toString());
   }



    showDialog() {
        this.visible = true;
    }

    patchvalueInform(){
      this.updateNoteForm.patchValue({
        title : this.note().title,
        content : this.note().content
      })
    }

updateNote(){

  const notetitel:string = this.updateNoteForm.get('title')?.value;
  const notecontent:string = this.updateNoteForm.get('content')?.value;

  if(this.updateNoteForm.valid){
  this.toastrService.success('Note updated successfully');

    this.visibleUpdate = false
    this.note().title = notetitel;
    this.note().content = notecontent;

    this.notesService.UpdateNote(this.note()._id , this.note()).subscribe({
      next:(res)=>{

      }
    })


  }else{
    this.updateNoteForm.markAllAsTouched();
  }

}

 deleteNote(id:string){
  this.notesService.deleteNote(id).subscribe({
    next:(res)=>{
    }
  })
 }


}
