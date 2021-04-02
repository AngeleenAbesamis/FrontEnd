import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ScriptGetService {
  apiURL: string = "https://p2-apiator.azurewebsites.net/Pilot";
  constructor(private client: HttpClient) { }

  public getContent(url: string) {


    let th: any = this.client.get(url,{ responseType: 'text' });


    return th;

  }


  public getScript(id: Number) {
    
   
    let th: any = this.client.get(this.apiURL + "/"+id);
    

    return th;

  }

}
