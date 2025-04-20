import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apis } from '../../../core/enviroments/enviroment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient , private router_:Router) { }

  registerApi(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}users/signUp`,data)
  }

  loginApi(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}users/signIn`,data)
  }

  logout():void{
    localStorage.removeItem("NoteToken");
    this.router_.navigate(["/login"]);
  }



}
