import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, shareReplay } from 'rxjs';
import { apis } from '../../../core/enviroments/enviroment';
import { Note } from '../../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes$:Observable<Note[]> | undefined
  constructor(private httpClient:HttpClient) { }


  getUserNote():Observable<any>{
    if(!this.notes$){
      this.notes$ = this.httpClient.get<Note[]>(`${apis.baseurl}notes`).pipe(shareReplay(1))
  }
  return this.notes$
    }


  deleteNote(id:string):Observable<any>{
    return this.httpClient.delete(`${apis.baseurl}notes/${id}`)
  }

  addNote(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}notes`,data)
  }

  UpdateNote(id:string,data:object):Observable<any>{
    return this.httpClient.put(`${apis.baseurl}notes/${id}`,data)
  }
}
