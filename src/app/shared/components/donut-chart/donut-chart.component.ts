// donut-chart.component.ts
import { Component, OnDestroy, AfterViewInit, effect, input, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { IEmissionsData } from '../../interfaces/emission.interface';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
})
export class DonutChartComponent implements OnInit, OnDestroy {
  data = input<IEmissionsData[]>([])
  title = input<string>('__VIEW_TITLE__');
  private root: am5.Root | undefined;
  private chart: am5percent.PieChart | undefined;
  private series: am5percent.PieSeries | undefined;
  private titleLabel: am5.Label | undefined;
  private legends: am5.Legend | undefined;
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  constructor() {
    // React to data changes
    effect(() => {
      const data = this.data();
      const title = this.title();
      console.log("🚀 ~ DonutChartComponent ~ effect ~ title:", title)
      const aggregatedData = this.aggregateData(data);
      this.series?.data.setAll(aggregatedData);
      // Update title using stored reference
      if (this.titleLabel) {
        this.titleLabel.set("text", title);
      }
    });
  }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createChart();
      this.cdr.detectChanges();
    });

  }

  private createChart(): void {
    this.root = am5.Root.new('chartdiv');
    this.root.setThemes([am5themes_Animated.new(this.root)]);
    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(40),
      })
    );


    this.series = this.chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
        innerRadius: am5.percent(40),

      })
    );
    this.series.set("colors", am5.ColorSet.new(this.root, {
      colors: [
        am5.color("#0077CC"),
        am5.color("#3399FF"),
        am5.color("#66CCFF")
      ],
    }));
    // Add label in the center
    this.titleLabel = this.series.children.push(
      am5.Label.new(this.root, {
        text: this.title(),
        fontSize: 20,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        populateText: true,
        textAlign: "center",
      })
    );

    this.series.slices.template.setAll({
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
      tooltipText: '',
      toggleKey: 'disabled'

    });

    this.series.labels.template.setAll({
      fontSize: 20,
      text: "{valuePercentTotal.formatNumber('#.0')}%",
      inside: true,
      radius: 35,
      fill: am5.color(0xffffff),
    });

    this.series.appear(1000, 150);
    this.root?._logo?.dispose();


  }

  private aggregateData(data: IEmissionsData[]): { category: string; value: number }[] {
    const result: Record<string, number> = {};
    for (const item of data) {
      result[item.category] = (result[item.category] || 0) + item.value;
    }
    return Object.entries(result).map(([category, value]) => ({ category, value }));
  }


  ngOnDestroy(): void {
    this.root?.dispose();
  }

}
