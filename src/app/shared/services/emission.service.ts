import { Injectable } from '@angular/core';
import { catchError, delay, of, throwError } from 'rxjs';
import { mockEmissionData } from '../../mocks/emission-mock-data';
import { EmissionCategoryEnum } from '../enums/emissions-enum';
import { IEmissionsData } from '../interfaces/emission.interface';
import { getCurrentYear } from '../../utils/date.utils';

@Injectable({ providedIn: 'root' })
export class EmissionsService {
  protected emissionData = mockEmissionData;

  getYears(): number[] {
    return Array.from(new Set(this.emissionData.map(e => e.year))).sort();
  }

  getBusinessUnits(): string[] {
    return Array.from(new Set(this.emissionData.map(e => e.businessUnit)));
  }

  getCategories(): EmissionCategoryEnum[] {
    return Object.values(EmissionCategoryEnum);
  }

  getEmissionsByYear(year: number): IEmissionsData[] {
    return this.emissionData.filter(e => e.year === year);
  }

  getCurrentYearEmissions(): IEmissionsData[] {
    return this.getEmissionsByYear(getCurrentYear());
  }

  getPreviousYearEmissions(): IEmissionsData[] {
    return this.getEmissionsByYear(getCurrentYear() - 1);
  }

  getEmissions() {
    return of(this.emissionData)?.pipe(delay(1000))?.pipe(catchError(err => {
      return throwError(() => new Error(err));
    }))
  }
}
