import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataRequestService } from '../../../../core/services/server-services/user-data-request.service';
import { DATA_REQUEST_STRATEGY, IUserDataRequestService } from '../../../../interfaces/user-data-request.interface';
import { Subscription } from 'rxjs';
import { SpinnerOverlayComponent } from '../../../../shared/components/loader-overlay/spinner-overlay.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerOverlayComponent, ButtonComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  providers: [
    {
      provide: DATA_REQUEST_STRATEGY,
      useClass: UserDataRequestService,
    }
  ]
})
export class LogINComponent {
  logForm!: FormGroup;
  showSpinner = false;

  #subcription: Subscription | undefined;
  #wrongPasswordsCounter = 0;

  constructor(
    @Inject(DATA_REQUEST_STRATEGY) private readonly userDataRequestService: IUserDataRequestService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router) {  }

  ngOnInit() {
    this.logForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null),
    });
  }

  onClick() {
    this.router.navigate(['home']); 
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

          if (this.#wrongPasswordsCounter == 3) {
            this.router.navigate(['/home']);
          }

          this.changeDetectorRef.markForCheck();

        },
      });

  }

  ngOnDestroy(){
    this.#subcription?.unsubscribe();
  }
}
