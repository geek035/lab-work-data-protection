import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataRequestService } from '../server-services/user-data-request.service';
import { Subscription } from 'rxjs';
import { SpinnerOverlayComponent } from '../loader/spinner-overlay/spinner-overlay.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerOverlayComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogINComponent {
  logForm!: FormGroup;
  showSpinner = false;

  #subcription: Subscription | undefined;
  #wrongPasswordsCounter = 0;

  constructor(
    private readonly userDataRequestService: UserDataRequestService,
    private readonly changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {
    this.logForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null),
    });
  }

  onSubmit() { 
    const username = this.logForm.controls['username'].value;
    const password = this.logForm.controls['password'].value;

    this.showSpinner = true;

    this.#subcription = this.userDataRequestService
      .getUserData(username, password)
      .subscribe({
        next: (responce) => {
          this.showSpinner = false;
          this.#wrongPasswordsCounter = 0;
          this.changeDetectorRef.markForCheck();
        },
        error: (error: HttpErrorResponse) => { 
          this.showSpinner = false;

          if (error.status == 404) {
            this.logForm.controls['username'].setErrors({ unknownUser: true });
          } else if (error.status == 401) {
            this.logForm.controls['password'].setErrors({ wrongPassword: true});
            this.#wrongPasswordsCounter++;
          }

          this.changeDetectorRef.markForCheck();

        },
      });
  }

  ngOnDestroy(){
    this.#subcription?.unsubscribe();
  }
}
