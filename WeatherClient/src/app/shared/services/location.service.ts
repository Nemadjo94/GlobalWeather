import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Constants } from '../../../app/app.constants';
import { Country } from '../../shared/models/country';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandleService } from '../../shared/services/error-handle.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private errorHandleService: ErrorHandleService) { }

  getCountries(): Observable<Country[]> {
    const uri = decodeURIComponent(`${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`);
    return this.http.get<Country[]>(uri)
      .pipe(
        tap(_ => console.log('fetched countries')),
        catchError(this.errorHandleService.handleError('getCountries', []))
      );
  }

}
