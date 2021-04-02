import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScriptSaveService {
  apiURL: string = "https://p2-apiator.azurewebsites.net/Script";
  constructor(private httpClient: HttpClient) {


}
  public SaveScript(processed: any) {
    console.log(processed);
   // return {};
    return this.httpClient.post(this.apiURL, processed);
    //return this.httpClient.get("https://p2-apiator.azurewebsites.net/Pilot/1")

  }


}
