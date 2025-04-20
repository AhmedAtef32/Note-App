import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apis } from '../../../core/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient:HttpClient) { }

  getUserNote():Observable<any>{
    return this.httpClient.get(`${apis.baseurl}notes`)
  }

  deleteNote(id:string):Observable<any>{
    return this.httpClient.delete(`${apis.baseurl}notes/${id}`)
  }

  addNote(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}notes`,data)
  }

}
