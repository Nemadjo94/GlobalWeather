import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../app/app.constants';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandleService } from '../../shared/services/error-handle.service';
var LocationService = /** @class */ (function () {
    function LocationService(http, errorHandleService) {
        this.http = http;
        this.errorHandleService = errorHandleService;
    }
    LocationService.prototype.getCountries = function () {
        var uri = decodeURIComponent(Constants.locationAPIUrl + "/countries?apikey=" + Constants.apiKey);
        return this.http.get(uri)
            .pipe(tap(function (_) { return console.log('fetched countries'); }), catchError(this.errorHandleService.handleError('getCountries', [])));
    };
    LocationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            ErrorHandleService])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
//# sourceMappingURL=location.service.js.map