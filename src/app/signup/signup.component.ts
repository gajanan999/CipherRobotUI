import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username : any = '';
  password: any = '';
  key: any = '';
  user: any = '';
  message : String ='';

  constructor(private rest:RestService, private router:Router) { }

  ngOnInit() {
  }

  createUser(event: Event){
    this.message='';
    if(this.username != "" && this.password != "" && this.key !=""){
      this.rest.createUser({
        'username' : this.username,
        'password' : this.password,
        'key' : this.key
      }).subscribe((response : any) =>{
        if(response.userid != undefined && response.userid != ""){
          this.user = response;
          this.router.navigate(["login"]);
        }     
      });
    }else{
        this.message = "Please enter all the fields";
    }

  }
}
