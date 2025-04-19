import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apis } from '../../../core/enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient) { }

  registerApi(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}users/signUp`,data)
  }

  loginApi(data:object):Observable<any>{
    return this.httpClient.post(`${apis.baseurl}users/signIn`,data)
  }
}
