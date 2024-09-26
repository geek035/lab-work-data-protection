import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserData } from '../../../../models/user-data.model';
import { DATA_REQUEST_STRATEGY, IUserDataRequestService } from '../../../../interfaces/user-data-request.interface';
import { UserDataRequestService } from '../../../../core/services/server-services/user-data-request.service';
import { UserPanelStateService } from '../services/user-panel-state/user-panel-state.service';
import { IUserPanelState } from '../../../../interfaces/user-panel-state.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    LoaderOverlayComponent,
    ReactiveFormsModule,
    ButtonComponent,
    NgFor, NgIf,
],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DATA_REQUEST_STRATEGY,
      useClass: UserDataRequestService,
    }
  ]
})
export class UsersListComponent {
  public form!: FormGroup;
  public showLoader = true;
  public username!: string;
  public users: UserData[] = [];

  constructor(
    private readonly router: Router,
    @Inject(DATA_REQUEST_STRATEGY)
    private readonly userDataRequestService: IUserDataRequestService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly userPanelStateService: UserPanelStateService
  ) {}

  ngOnInit() {
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

    this.form = new FormGroup([]);
    this.userDataRequestService.getUsersData()
      .subscribe({
        next: (data) => {
          this.users = data as UserData[];
          this.form.addControl(this.users[0].username, new FormGroup([
            new FormControl({ value: null, disabled: true }),
            new FormControl({ value: null, disabled: true }),
          ]));

          for (let i = 1; i < this.users.length; i++) {
            this.form.addControl(this.users[i].username, new FormGroup([
              new FormControl((this.users[i] as any).isAdminLocked),
              new FormControl((this.users[i] as any).isPasswordRestricted),
            ]));
          }
          
          this.showLoader = false;
          this.changeDetectorRef.markForCheck();
        }});
  }

  onSubmit() {
    this.showLoader = true;
    const updatedUsers = this.users.map(user => {
      return {
        username: user.username,
        IsAdminLocked: this.form.get(user.username)?.get('0')?.value ?? false,           
        IsPasswordRestricted: this.form.get(user.username)?.get('1')?.value ?? false 
      };
    });

    this.userDataRequestService.updateAllUsers(updatedUsers).subscribe({
      next: (response) => {
        this.userPanelStateService.setState({updatedUsers: true} as IUserPanelState);
        this.showLoader = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.form.setErrors({error: true});
        this.showLoader = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  onClick() {
    this.router.navigate([`/user/${this.username}/description`]);
  }
}
