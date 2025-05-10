import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratioPercentage',
  standalone: true
})
export class RatioPercentagePipe implements PipeTransform {
  transform(ratio: number): string {
    if (!ratio || ratio === 0) return 'N/A';

    // Check if ratio equals 1 (no change)
    if (ratio === 1) return 'No change';

    // Calculate percentage change
    const percentChange = Math.abs((ratio - 1) * 100).toFixed(1);

    // Determine if higher or lower
    const direction = ratio > 1 ? 'higher' : 'lower';

    return `${percentChange}% ${direction} than previous year`;
  }
}
