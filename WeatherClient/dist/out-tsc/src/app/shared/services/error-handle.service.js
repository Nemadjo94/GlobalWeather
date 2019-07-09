import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
var ErrorHandleService = /** @class */ (function () {
    function ErrorHandleService() {
    }
    ErrorHandleService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(error); //Log to console instead
            //Let the app keep running by returning an empty string
            return of(result);
        };
    };
    ErrorHandleService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ErrorHandleService);
    return ErrorHandleService;
}());
export { ErrorHandleService };
//# sourceMappingURL=error-handle.service.js.map