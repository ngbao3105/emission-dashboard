import { Injectable, computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { catchError, finalize, map, tap } from 'rxjs';
import { EmissionCategoryEnum } from '../shared/enums/emissions-enum';
import { IEmissionsData } from '../shared/interfaces/emission.interface';
import { EmissionsService } from '../shared/services/emission.service';
import { getCurrentYear } from '../utils/date.utils';
import { percent } from '@amcharts/amcharts5';

// Define the state interface
export interface EmissionsState {
  emissions: IEmissionsData[];
  currentYearEmissions: IEmissionsData[];
  annualTotal: number;
  totalsInCategory: Record<EmissionCategoryEnum, number> | undefined;
  compareWithAnnualTotal: number;
  compareWithPreviousYearAnnualTotal: number;
  compareWithTotalsInCategory: Record<EmissionCategoryEnum, number> | undefined;
  selectedYear: number;
  isLoading: boolean;
  compareWithLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: EmissionsState = {
  emissions: [],
  currentYearEmissions: [],
  annualTotal: 0,
  compareWithAnnualTotal: 0,
  compareWithPreviousYearAnnualTotal: 0,
  totalsInCategory: undefined,
  compareWithTotalsInCategory: undefined,
  selectedYear: getCurrentYear(),
  isLoading: false,
  compareWithLoading: false,
  error: null
};

// Create the store

export const EmissionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store, emissionsService = inject(EmissionsService)) => ({
    // Get emissions data


    getCurrentYearAnnualTotal: computed(() => {
      return emissionsService.getCurrentYearEmissions().reduce((acc, curr) => acc + curr.value, 0);
    }),

    getCurrentToPreviousYearRatio: computed(() => {
      // Get current year total
      const currentYearTotal = emissionsService.getCurrentYearEmissions()
        .reduce((acc, curr) => acc + curr.value, 0);

      // Get previous year total
      const previousYearTotal = emissionsService.getPreviousYearEmissions()
        .reduce((acc, curr) => acc + curr.value, 0);

      // Avoid division by zero
      return previousYearTotal > 0 ? currentYearTotal / previousYearTotal : 0;
    }),

    getTotalEnergyConsumption: computed(() => {
      const selectedYear = store.selectedYear();

      // Assuming energy consumption is stored in emissions with category SCOPE_2
      // Modify this filter if your energy data is categorized differently
      return emissionsService.getCurrentYearEmissions()
        .filter(e => e.category === EmissionCategoryEnum.SCOPE_2)
        .reduce((acc, curr) => acc + curr.value, 0);
    }),

    getEnergyConsumptionRatio: computed(() => {
      const selectedYear = store.selectedYear();
      const previousYear = selectedYear - 1;

      // Get current year energy consumption
      const currentYearEnergy = emissionsService.getCurrentYearEmissions()
        .filter(e => e.category === EmissionCategoryEnum.SCOPE_2)
        .reduce((acc, curr) => acc + curr.value, 0);

      // Get previous year energy consumption
      const previousYearEnergy = emissionsService.getPreviousYearEmissions()
        .filter(e => e.category === EmissionCategoryEnum.SCOPE_2)
        .reduce((acc, curr) => acc + curr.value, 0);


      // Avoid division by zero
      return previousYearEnergy > 0 ? currentYearEnergy / previousYearEnergy : 0;
    }),


    getCompareWithRatioInTotal: computed(() => {
      const compareWithAnnualTotal = store.compareWithAnnualTotal();
      const annualTotal = store.annualTotal();
      return annualTotal > 0 ? {
        percentage: compareWithAnnualTotal / annualTotal,
        gapNumber: compareWithAnnualTotal - annualTotal
      } : {
        percentage: 0,
        gapNumber: 0
      };
    }),
    getCompareWithRatioInCategory: computed(() => {
      const compareWithTotalsInCategory = store.compareWithTotalsInCategory();
      const totalsInCategory = store.totalsInCategory();

      if (!compareWithTotalsInCategory || !totalsInCategory) {
        return undefined;
      }

      return Object.keys(compareWithTotalsInCategory).reduce(
        (acc: Record<EmissionCategoryEnum, { percentage: number, gapNumber: number }>, key) => {
          const category = key as EmissionCategoryEnum;
          const compareValue = compareWithTotalsInCategory[category];
          const totalValue = totalsInCategory[category];

          if (totalValue !== 0 && compareValue !== undefined) {
            acc[category] = {
              percentage: compareValue / totalValue,
              gapNumber: compareValue - totalValue,
            };
          } else {
            acc[category] = {
              percentage: 0,
              gapNumber: 0,
            }; // or handle as needed
          }

          return acc;
        },
        {} as Record<EmissionCategoryEnum, { percentage: number, gapNumber: number }>
      );
    }),
  })),
  withMethods((store, emissionsService = inject(EmissionsService)) => ({
    // Set selected year
    setYear(year: number) {
      patchState(store, { selectedYear: year });
    },

    setEmissions(data: IEmissionsData[]) {
      patchState(store, { emissions: data });
    },

    // Set compare with year
    setCompareWithYear(year: number) {
      // First clear the existing data to ensure reactivity
      patchState(store, {
        compareWithLoading: true,
        compareWithTotalsInCategory: undefined,
        compareWithAnnualTotal: 0
      });

      return emissionsService.getEmissions()?.pipe(
        map((emissions: IEmissionsData[]) => {
          return emissions.filter(e => e.year === year);
        }),
        tap((emissions: IEmissionsData[]) => {
          // Create a new object for compareWithTotalsInCategory to ensure reactivity
          const categoryTotals = emissions.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.value;
            return acc;
          }, {} as Record<EmissionCategoryEnum, number>);

          patchState(store, {
            compareWithAnnualTotal: emissions.reduce((acc, curr) => acc + curr.value, 0),
            compareWithTotalsInCategory: categoryTotals
          });
        }),
        finalize(() => {
          patchState(store, { compareWithLoading: false });
        })
      );
    },

    // Load emissions data
    loadEmissions: (year?: number) => {
      patchState(store, { selectedYear: year || store?.selectedYear(), isLoading: true, error: null })
      return emissionsService.getEmissions()?.pipe(
        map((emissions: IEmissionsData[]) => {
          return year ? emissions.filter(e => e.year === year) : emissions;
        }),
        tap((emissions: IEmissionsData[]) => {
          patchState(store, () => ({
            emissions,
            annualTotal: emissions.reduce((acc, curr) => acc + curr.value, 0),
            totalsInCategory: emissions.reduce((acc, curr) => {
              acc[curr.category] = (acc[curr.category] || 0) + curr.value;
              return acc;
            }, {} as Record<EmissionCategoryEnum, number>),
            isLoading: false,
          }))
        }),
        catchError((error: any) => {
          patchState(store, { error: error.message, isLoading: false });
          throw error;
        })

      )
    }

  })))
