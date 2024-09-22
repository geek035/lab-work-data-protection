import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent {
  constructor(private readonly router: Router) {  }

  onClick() {
    this.router.navigate(['log-in']);
  }
} 
