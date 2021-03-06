import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RestService } from '../rest.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'CipherRobotUI';
  dataEntities: any = [];
  mainInput: any = '';
  algorithms: any = ['AES','DES'];
  algorithm: any = '';
  errorMessage: String = '';


  private dataEntitiesObservable : Observable<any[]> ; 


  constructor(public rest:RestService,private spinner: NgxSpinnerService) {

   }

  ngOnInit() {
    this.spinner.show();
    this.getDataEntities();
  }

  changeText(event:Event){
 
  }

  getDataEntities(){
    this.spinner.show();
    this.dataEntities = [];
    this.rest.getDataEntities().subscribe((data:{}) =>{
      console.log(data);
      this.dataEntities = data;
      this.spinner.hide();
    });
   
  }

 


  handleRowClick(event:Event, id:Number){
    

    let data: any = this.dataEntities.filter( item =>{
      return id === item.id;
    });
    this.mainInput = data[0]== undefined ? '': data[0].text;
 
  }

  getTextFromDataEntities(id:Number){
    let data: any = this.dataEntities.filter( item =>{
      return id === item.id;
    });
    return data[0]== undefined ? '': data[0].text;
  }

  handleEncryptClick(event:Event){
   
    this.errorMessage='';
    let response: any = {}
    if(this.algorithm != ''){
      var rest={
        'text' : this.mainInput,
        'key' : localStorage.getItem('key'),
        'algorithm' : this.algorithm
      }
      this.rest.getDataEncryption(rest).subscribe((data: any) =>{
       
        response =data;
        if(null != data.id && undefined != data.id ){
          this.mainInput = data.text;
        }
        this.getDataEntities();
      });
     

    }else{
      this.errorMessage='Please Select the Algorithm';
    }
  }

  handleDecryptClick(event:Event){
    
   
    this.errorMessage='';
    let response: any = {}
    if(this.algorithm != ''){
      var rest={
        'text' : this.mainInput,
        'key' : localStorage.getItem('key'),
        'algorithm' : this.algorithm
      }
      this.rest.getDataDecryption(rest).subscribe((data: any) =>{
        
        response =data;
        if('SUCCESS' == data.status){
          this.mainInput = data.decryptedText;
        }else{
          this.errorMessage = 'Error : '+ data.status + ' : ' + data.message;
        }
        this.getDataEntities();
      });
    }else{
      this.errorMessage='Please select the Algorithm';
    }
    
  }
}
