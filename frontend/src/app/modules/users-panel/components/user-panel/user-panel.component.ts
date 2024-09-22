import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { ActivatedRoute } from '@angular/router';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [AdminPanelComponent, LoaderOverlayComponent, NgIf],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {
  public username!: string;
  public showLoader = true;

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.username = params['id'];
      
      this.showLoader = false;
    });
  }

  ngOnInit(){

  }
}
