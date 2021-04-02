import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileSaveService {
  apiURL: string = "https://p2-apiator.azurewebsites.net/File";
  constructor(private httpClient: HttpClient) {


}
  public SaveFile(formData: any) {
    
  
    return this.httpClient.post(this.apiURL, formData);
   

  }


}
