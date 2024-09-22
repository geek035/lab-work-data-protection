import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoaderComponent } from '../app-loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [LoaderComponent, NgIf],
  templateUrl: './spinner-overlay.component.html',
  styleUrl: './spinner-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerOverlayComponent {
  @Input() showSpinner: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }
}
