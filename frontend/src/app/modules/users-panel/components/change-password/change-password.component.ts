import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LoaderOverlayComponent } from '../../../../shared/components/loader-overlay/loader-overlay.component';
import { NgIf } from '@angular/common';

import { Router } from '@angular/router';
import {
  IUserUpdateDataService,
  USER_DATA_UPDATE_STRATEGY,
} from '../../../../interfaces/user-update-data.interface';
import { UserUpdateDataService } from '../../../../core/services/user-update-data-service/user-update-data.service';
import { UserPanelStateService } from '../services/user-panel-state/user-panel-state.service';
import { changePasswordRequest } from '../../../../models/change-password-request';
import { IUserPanelState } from '../../../../interfaces/user-panel-state.interface';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, LoaderOverlayComponent, NgIf],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: USER_DATA_UPDATE_STRATEGY,
      useClass: UserUpdateDataService,
    },
  ],
})
export class ChangePasswordComponent {
  public form!: FormGroup;
  public showLoader = true;

  public username!: string;
  public firstRegistration = false;

  constructor(
    @Inject(USER_DATA_UPDATE_STRATEGY)
    private readonly userDataUpdateService: IUserUpdateDataService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly userPanelState: UserPanelStateService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null, [Validators.required]),
      repeatedPassword: new FormControl(null, [Validators.required]),
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.username = navigation.extras.state['username'];
      this.firstRegistration = navigation.extras.state['firstRegistration'] ?? false;
    } else {
      // Если навигация уже завершена, то можно получить данные через `history.state`
      this.username = history.state['username'];
      this.firstRegistration = history.state['firstRegistration'] ?? false;
    }
    
    if (!this.username) {
      this.router.navigate(['/home']);
    }

    this.showLoader = false;
  }

  onSubmit() {
    const oldPassword = this.form.controls['oldPassword'].value ?? "";
    const newPassword = this.form.controls['newPassword'].value;
    const repeatedPassword = this.form.controls['repeatedPassword'].value;

    if (newPassword !== repeatedPassword) {
      this.form.controls['repeatedPassword'].setErrors({
        invalidPassword: true,
      });
      return;
    }

    this.showLoader = true;
    this._changeDetectorRef.markForCheck();
    this.userDataUpdateService
      .changePassword(
        new changePasswordRequest(this.username, newPassword),
        oldPassword
      )
      .subscribe({
        next: (response) => {
          this.showLoader = false;
          this.firstRegistration = false;
          this.userPanelState.setState({passwordUpdate: true} as IUserPanelState);
          this.router.navigate([`user/${this.username}/description`]);
          this._changeDetectorRef.markForCheck();
        },
        error: (err) => {
          this.form.controls['oldPassword'].setErrors({
            incorrectPassword: true,
          });
          this.showLoader = false;
          this._changeDetectorRef.markForCheck();
        },
      });
  }

  onClick() {
    if (this.firstRegistration) {
      sessionStorage.removeItem('token');
      this.router.navigate([`home`]);
    } else {
      this.router.navigate([`user/${this.username}/description`]);
    }
  }
}
