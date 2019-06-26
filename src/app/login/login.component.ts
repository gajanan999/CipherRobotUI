import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : any = '';
  password: any = '';
  message : String = '';
  
  constructor(private rest:RestService,private router:Router) { }

  ngOnInit() {
   
  }

  handleLogin(event:Event){
    this.message='';
    this.rest.login({
      'username': this.username,
      'password' : this.password
    }).subscribe((data: any)=>{
      if((data != undefined || null != data) && data.status == undefined){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('username', data.username);
        localStorage.setItem('key', data.key);
        this.router.navigate(["main"]);
      }else{
        this.message = "Oops! Something went wrong or entered Invalid Credentials"
      }
    })
  }

  handleSignup(event:Event){
    this.router.navigate(["signup"]);
  }


}
