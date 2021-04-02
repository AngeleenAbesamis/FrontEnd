import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { ScriptSaveService } from '../../services/script-save.service';
import { ScriptGetService } from '../../services/script-get.service';
import { UserRESTService } from 'src/app/services/user-rest.service';

declare var ParseEngine: any;
declare var CacheEngine: any;
declare var FileManagement: any;
declare var form: FormGroup;
@Component({
  selector: 'app-script',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})

export class ScriptComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private ssave: ScriptSaveService, private sget: ScriptGetService, public auth: AuthService, private userService: UserRESTService) {
 
  }
  form : FormGroup;
  error: String;
  userId: Number;
  fr: any;
  resultFile: any;
  ngOnInit() {
    this.auth.user$.subscribe(user =>
      this.userService.GetUserByEmail(user.email).subscribe
        (
          foundUser => {
            CacheEngine.user = foundUser.id;
          }
        )
    );
    let resultFile = "";
   this.form = this.formBuilder.group({
     screenplay: ['']
    });
    if (CacheEngine.getCache("Processed")) {
      new ParseEngine().process("", false);
    }
    else {
      this.sget.getScript(CacheEngine.pilot).subscribe(x => { CacheEngine.purge("all"); this.sget.getContent(x.script.scriptURL).subscribe(y => new ParseEngine().ProcessSaved(y)) })
    }
    CacheEngine.onProcessedChange((res) =>
      this.ssave.SaveScript(res).subscribe(x => console.log(x))
    );
  }
  onGet(event) {
    this.sget.getScript(CacheEngine.pilot).subscribe(x => { CacheEngine.purge("all"); this.sget.getContent(x.script.scriptURL).subscribe(y => new ParseEngine().ProcessSaved(y)) })
  };

  onSave(event) {
   new ParseEngine().reProcess();
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('screenplay').setValue(file);
      let Result: any = ""
      console.log(this.form.get('screenplay').value);
      let fr = new FileReader();
      fr.readAsText(this.form.get('screenplay').value);
      fr.onload = res => {
        Result = (res.target as FileReader).result;
        new ParseEngine().process(Result,true);
      };
      
    }



    }
  }
