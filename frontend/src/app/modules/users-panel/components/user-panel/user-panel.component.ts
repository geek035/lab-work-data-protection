import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [AdminPanelComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {

}
