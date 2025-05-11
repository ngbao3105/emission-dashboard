import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { EmissionsStore } from '../../store/emissions.store';
import { IEmissionsData } from '../../shared/interfaces/emission.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RatioPercentagePipe } from '../../shared/pipes/ratio-percentage.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DonutChartComponent } from '../../shared/components/donut-chart/donut-chart.component';
import { EmissionsService } from '../../shared/services/emission.service';
import { getCurrentYear } from '../../utils/date.utils';
import { EMISSIONS_CATEGORY } from '../../shared/constants/common.const';
import { EmissionCategoryEnum } from '../../shared/enums/emissions-enum';
import { ScopeItemComponent } from '../../shared/components/scope-item/scope-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { formatNumberWithCommas } from '../../utils/common.utils';
import { AbsPipe } from '../../shared/pipes/abs.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatIconModule,
    RatioPercentagePipe,
    AbsPipe,
    DonutChartComponent,
    ScopeItemComponent,
    MatSelectModule,
    MatFormFieldModule,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected emissionService = inject(EmissionsService);
  protected emissionStore = inject(EmissionsStore);
  years = this.emissionService.getYears();
  categories = this.emissionService.getCategories();
  currentYear = getCurrentYear();
  emissions = signal<IEmissionsData[]>([])
  selectedYear = signal(this.currentYear);
  comparedToYear = signal(this.currentYear - 1);
  loading = computed(() => this.emissionStore.isLoading());
  compareWithLoading = computed(() => this.emissionStore.compareWithLoading());
  businessUnits = [{ label: 'All business unit', value: 'all' }, ...this.emissionService.getBusinessUnits()?.map(bu => ({ label: bu, value: bu }))]
  chartTitle = computed(() => {
    return `Total emissions (tCo2e)\n${formatNumberWithCommas(this.emissionStore.annualTotal())}`
  })
  compareWithTotal = computed(() => {
    const gapValue = this.emissionStore.getCompareWithRatioInTotal();
    return {
      title: "Total emissions (tCo2e)",
      value: this.emissionStore.compareWithAnnualTotal(),
      ratio: gapValue?.percentage!,
      gapNumber: gapValue?.gapNumber!
    }
  });
  categoryLegends = computed(() => {
    return this.categories?.map(category => {
      return {
        title: EMISSIONS_CATEGORY[category as EmissionCategoryEnum]?.title,
        color: EMISSIONS_CATEGORY[category as EmissionCategoryEnum]?.color,
        value: this.emissionStore.totalsInCategory()?.[category] || 0,
      }
    });
  })
  compareWithCategory = computed(() => {
    return this.categories?.reduce((acc, category) => {
      const gapValue = this.emissionStore.getCompareWithRatioInCategory()?.[category];
      const totalValue = this.emissionStore.compareWithTotalsInCategory()?.[category] || 0;
      return [
        ...acc,
        {
          title: EMISSIONS_CATEGORY[category as EmissionCategoryEnum]?.title,
          ratio: gapValue?.percentage!,
          gapNumber: gapValue?.gapNumber!,
          value: totalValue,
        }
      ];
    }, [] as { title: string; value: number, ratio: number }[]);
  });

  compareWithValues = computed(() => {
    return [this.compareWithTotal(), ...this.compareWithCategory()]
  })

  currentYearTotal = computed(() => {
    return {
      iconName: 'cloud',
      title: "Total emissions (tCo2e)",
      value: this.emissionStore.getCurrentYearAnnualTotal(),
      compareWithValue: this.emissionStore.getCurrentToPreviousYearRatio(),
    }
  })

  currentYearEnergyConsumption = computed(() => {
    return {
      iconName: 'bolt',
      title: "Energy consumption (tCo2e)",
      value: this.emissionStore.getTotalEnergyConsumption(),
      compareWithValue: this.emissionStore.getEnergyConsumptionRatio(),
    }
  });

  ngOnInit(): void {
    this.emissionStore.loadEmissions(this.selectedYear()).subscribe((emissions: IEmissionsData[]) => {
      this.emissions.set(emissions);
    });
    this.emissionStore.setCompareWithYear(2023).subscribe(() => { });
  }

  onSummaryYearChange(changes: MatSelectChange) {
    const selectedYear = Number(changes.value);
    this.selectedYear.set(selectedYear);
    this.emissionStore.loadEmissions(selectedYear).subscribe((emissions: IEmissionsData[]) => {
      this.emissions.set(emissions);

    });
  }

  onCompareToYearChange(changes: MatSelectChange) {
    this.emissionStore.setCompareWithYear(Number(changes.value)).subscribe(() => {
    });
  }

  onBuChanges(changes: MatSelectChange) {
  }

}
