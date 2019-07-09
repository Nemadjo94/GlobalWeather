import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../shared/services/location.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../shared/models/country';
import { Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private weatherForm: FormGroup;
    countries: any;
    errorMessage: any;
    instanceCountry: any;
    focus$: any;
    click$: any;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService) {
    
  }

  async ngOnInit() {
    this.weatherForm = this.buildForm();
    await this.getCountries();
  }

  //getCountries(): void {
  //  this.locationService.getCountries().subscribe(countries => this.countries = countries)
  //}

  countryFormatter = (country: Country) => country.EnglishName;

  searchCountry = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe
      (filter(() => !this.instanceCountry.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === ''
        ? this.countries
        : this.countries.filter(v => v.EnglishName.toLowerCase().indexOf
          (term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  async getCountries() {
    const promise = new Promise((resolve, reject) => {
      this.locationService.getCountries()
        .toPromise()
        .then(
          res => { // Success
            this.countries = res;
            resolve();
          },
          err => {
            console.error(err);
            this.errorMessage = err;
            reject(err);
          }
        );
    });
    await promise;
  }

  buildForm(): FormGroup {
    return this.fb.group({
      searchGroup: this.fb.group({
        country: [
          null
        ],
        city: [
          null, [Validators.required]
        ]
      })
    });
  }

}
