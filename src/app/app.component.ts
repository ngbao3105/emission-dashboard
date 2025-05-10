import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _matIconRegistry = inject(MatIconRegistry);
  private _domSanitizer = inject(DomSanitizer);
  constructor() {
    this._matIconRegistry.addSvgIcon(
      'cloud',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/cloud.svg')
    );
    this._matIconRegistry.addSvgIcon(
      'bolt',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/bolt.svg')
    );
  }
  title = 'chart-dashboard';
}
