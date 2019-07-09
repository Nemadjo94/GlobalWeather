import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandleService {
  constructor() { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); //Log to console instead
      //Let the app keep running by returning an empty string
      return of(result as T);
    }
  }
}
