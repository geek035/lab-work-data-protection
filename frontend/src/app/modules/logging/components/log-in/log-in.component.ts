import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoaderOverlayComponent } from '../../../../shared/components/loader-overlay/loader-overlay.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { AUTHENTICATION_STRATEGY, IAuthenticationService } from '../../../../interfaces/authentication.interface';
import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service';
import { LoginResponse } from '../../../../models/login-response';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderOverlayComponent, ButtonComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  providers: []
})
export class LogINComponent {
  logForm!: FormGroup;
  showSpinner = false;

  #subcription: Subscription | undefined;
  #wrongPasswordsCounter = 0;

  constructor(
    @Inject(AUTHENTICATION_STRATEGY) private readonly authenticationService: IAuthenticationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {  }

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

    this.#subcription = this.authenticationService
      .authenticate(username, password)
      .subscribe({
        next: (responce) => {
          this.showSpinner = false;
          this.#wrongPasswordsCounter = 0;
          this.changeDetectorRef.markForCheck();
          console.log(responce);
          this.router.navigate(["user", (responce as LoginResponse).user.username]);
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
