import { Component , inject, OnInit, WritableSignal } from '@angular/core';
import { NoteContainerComponent } from "../../../../../Shared/components/ui/note-container/note-container.component";
import { NotesService } from '../../../../../Shared/services/notes/notes.service';
import { Note } from '../../../../../Shared/interfaces/note';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchNotePipe } from '../../../../../core/pipe/search-note.pipe';
import { SkeletonComponent } from "../../../../../Shared/components/ui/skeleton/skeleton.component";
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notes',
  imports: [NoteContainerComponent, Dialog, ButtonModule, InputTextModule, ReactiveFormsModule, SearchNotePipe, FormsModule, SkeletonComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',

})
export class NotesComponent implements OnInit {

  private readonly notesService = inject(NotesService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly toastrService = inject(ToastrService)
  userNotes!:Note[]
  skeleton:Array<number> = [1 ,2 ,3 ,4 , 5 , 6]
  noNotesData:boolean = true
  visible: boolean = false;
  callinjgApi: boolean = false;
  searchNote: string = '';
  addNoteForm:FormGroup = this.formBuilder.group({
    title: [null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20) ]],
    content : [null , [Validators.required , Validators.minLength(10) , Validators.maxLength(100) ]]
  })

  ngOnInit(): void {
    this.getUserNote()
  }
  showDialog() {
      this.visible = true;
  }




  getUserNote():void{
    this.notesService.getUserNote().subscribe({
      next:(res)=>{
        this.userNotes = res.notes
        this.noNotesData = false
        console.log(res)
      },error:(err)=>{
        this.noNotesData = false
        this.toastrService.info('No Notes Found','Docker')

      }
    })
  }

  addNote(){
    this.callinjgApi = true
    if(this.addNoteForm.valid){
      this.notesService.addNote(this.addNoteForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.callinjgApi = false
          this.visible = false
          this.addNoteForm.reset()
          this.getUserNote()
        },error:(err)=>{
          this.callinjgApi = false
        }
      })
    }else{
      this.callinjgApi = false
      this.addNoteForm.markAllAsTouched()
    }
  }



}
