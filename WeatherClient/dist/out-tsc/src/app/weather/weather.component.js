import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../shared/services/location.service';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
var WeatherComponent = /** @class */ (function () {
    function WeatherComponent(fb, locationService) {
        var _this = this;
        this.fb = fb;
        this.locationService = locationService;
        //getCountries(): void {
        //  this.locationService.getCountries().subscribe(countries => this.countries = countries)
        //}
        this.countryFormatter = function (country) { return country.EnglishName; };
        this.searchCountry = function (text$) {
            var debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            var clicksWithClosedPopup$ = _this.click$.pipe(filter(function () { return !_this.instanceCountry.isPopupOpen(); }));
            var inputFocus$ = _this.focus$;
            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(map(function (term) { return (term === ''
                ? _this.countries
                : _this.countries.filter(function (v) { return v.EnglishName.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
    }
    WeatherComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.weatherForm = this.buildForm();
                        return [4 /*yield*/, this.getCountries()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.getCountries = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve, reject) {
                            _this.locationService.getCountries()
                                .toPromise()
                                .then(function (res) {
                                _this.countries = res;
                                resolve();
                            }, function (err) {
                                console.error(err);
                                _this.errorMessage = err;
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.buildForm = function () {
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
    };
    WeatherComponent = tslib_1.__decorate([
        Component({
            selector: 'app-weather',
            templateUrl: './weather.component.html',
            styleUrls: ['./weather.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            LocationService])
    ], WeatherComponent);
    return WeatherComponent;
}());
export { WeatherComponent };
//# sourceMappingURL=weather.component.js.map