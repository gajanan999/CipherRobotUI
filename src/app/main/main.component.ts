import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'CipherRobotUI';
  dataEntities: any = [];

  private dataEntitiesObservable : Observable<any[]> ; 


  constructor(public rest:RestService) {

   }

  ngOnInit() {
    this.getDataEntities();
  }

  getDataEntities(){
    this.dataEntities = [];
    this.rest.getDataEntities().subscribe((data:{}) =>{
      console.log(data);
      this.dataEntities = data;
    });
  }

}
