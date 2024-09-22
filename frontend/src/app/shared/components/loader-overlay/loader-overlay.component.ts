import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader-overlay',
  standalone: true,
  imports: [LoaderComponent, NgIf],
  templateUrl: './loader-overlay.component.html',
  styleUrl: './loader-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderOverlayComponent {
  @Input() showLoader: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }
}
