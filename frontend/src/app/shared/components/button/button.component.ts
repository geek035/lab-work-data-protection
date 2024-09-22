import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],

  template: `
    <button [type]="buttonType" class="button" (click)="onClickHandler()">
      <ng-content></ng-content>
    </button>`,

  styles: `
    .button {
      width: 100px;
      cursor: pointer;
      height: 35px;
      text-transform: uppercase;
      border-radius: 5px;
      transition: background-color .3s ease-out;
    }
    .button:hover {
      background-color: black;
      color: white;
    }
    `,
    
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() onClickHandler: () => void = () => {};
  @Input() buttonType: string = "button";
}