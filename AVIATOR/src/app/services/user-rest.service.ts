import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserRESTService {
  responseValue: any;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }
  url: string = 'https://p2-apiator.azurewebsites.net/api/user'
  constructor(private http: HttpClient) { }
  GetUserByEmail(email: string): Observable<user>
  {
    return this.http.get<user>(`${this.url}/email/${email}`, this.httpOptions);
  }
  GetUsersByID(id: number): Observable<user>
  {
    return this.http.get<user>(`${this.url}s/${id}`, this.httpOptions);
  }
  EditUser(user2edit: user):Observable<user>
  {
    return this.http.put<user>(`${this.url}/${user2edit.id}`, user2edit, this.httpOptions);
  }
}
