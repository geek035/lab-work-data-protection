import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserUpdateDataService, USER_DATA_UPDATE_STRATEGY } from '../../../../interfaces/user-update-data.interface';
import { Router } from '@angular/router';
import { UserPanelStateService } from '../services/user-panel-state/user-panel-state.service';
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { UserUpdateDataService } from '../../../../core/services/user-update-data-service/user-update-data.service';
import { UserDataToUpdate } from '../../../../models/user-data-to-update.model';
import { IUserPanelState } from '../../../../interfaces/user-panel-state.interface';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    LoaderOverlayComponent,
    LoaderOverlayComponent,
    ReactiveFormsModule,
    NgIf,
    ButtonComponent
],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: USER_DATA_UPDATE_STRATEGY,
      useClass: UserUpdateDataService,
    }
  ]
})
export class AddUserComponent {
  public showLoader = true;
  public username!: string;
  public form!: FormGroup;

  constructor(
    @Inject(USER_DATA_UPDATE_STRATEGY)
    private readonly userDataUpdateService: IUserUpdateDataService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly userPanelState: UserPanelStateService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.username = navigation.extras.state['username'];
    } else {
      // Если навигация уже завершена, то можно получить данные через `history.state`
      this.username = history.state['username'];
    }
    
    if (!this.username) {
      this.router.navigate(['/home']);
    }

    this.showLoader = false;
  }

  onSubmit() {
    const username = this.form.controls['username'].value;

    if (username == null) {
      this.form.controls['username'].setErrors({emptyField: true});
      return;
    }

    this.showLoader = true;
    this._changeDetectorRef.markForCheck();
    this.userDataUpdateService
      .addUser(new UserDataToUpdate(username, undefined, undefined))
      .subscribe({
        next: (response) => {
          this.userPanelState.setState({newUser: username} as IUserPanelState);
          this.showLoader = false;
          this._changeDetectorRef.markForCheck();
        },
        error: (err) => { 
          this.form.controls['username'].setErrors({requestErr: true});
          this.showLoader = false;
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  onClick() {
    this.router.navigate([`/user/${this.username}/description`]);
  } 
}
