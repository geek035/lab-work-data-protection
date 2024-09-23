import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {
  public form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null, [Validators.required]),
      repeatedPassword: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    
  }

  onClick() {

  }
}
