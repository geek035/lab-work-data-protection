import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogINComponent } from './modules/logging/components/log-in/log-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogINComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
