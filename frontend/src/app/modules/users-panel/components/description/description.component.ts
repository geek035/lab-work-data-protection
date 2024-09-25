import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [LoaderOverlayComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent {
  public showLoader = true;

  ngOnInit() {
    this.showLoader = false;
  }
}
