import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'password')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getDataEntities(): Observable<any> {
    return this.http.get(endpoint + 'getData', 
      httpOptions).pipe(
      map(this.extractData));
  }

  getDataEncryption (encryptDecryptRequest): Observable<any> {
    console.log(encryptDecryptRequest);
    return this.http.post<any>(endpoint + 'getEncyption', JSON.stringify(encryptDecryptRequest), httpOptions).pipe(
      tap((encryptDecryptResponse) => {console.log(encryptDecryptResponse)}),
      catchError(this.handleError<any>('getDataEncryption'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
