import { isPlatformBrowser } from '@angular/common';
import { Pipe, PipeTransform, inject, PLATFORM_ID } from '@angular/core';
import { Note } from '../../Shared/interfaces/note';

@Pipe({
  name: 'searchNote'
})
export class SearchNotePipe implements PipeTransform {

 private pLATFORM_ID= inject(PLATFORM_ID)


  transform(value: Note[], search: string): any {
    if(isPlatformBrowser(this.pLATFORM_ID)){

      return value.filter((note)=> note.title.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
