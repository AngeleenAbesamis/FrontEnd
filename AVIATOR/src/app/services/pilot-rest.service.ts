import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pilot } from '../models/pilot';

@Injectable({
  providedIn: 'root'
})
export class PilotRESTService {
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }
  url: string = 'https://p2-apiator.azurewebsites.net/pilot';
  constructor(private http: HttpClient) { }
  AddPilot(pilot2Add: pilot): Observable<pilot>
  {
    return this.http.post<pilot>(this.url, pilot2Add, this.httpOptions);
  }
  // GetPilotsByEmail(email: string): Observable<pilot[]>
  // {
  //   return this.http.get<pilot[]>(this.url, this.httpOptions);
  // }
  GetPilotsByProducerID(producerID: number): Observable<pilot[]>
  {
    return this.http.get<pilot[]>(`${this.url}?userID=${producerID}`, this.httpOptions);
  }
  GetPilot(id: number): Observable<pilot>
  {
    return this.http.get<pilot>(`${this.url}/${id}`,this.httpOptions);
  }
}
