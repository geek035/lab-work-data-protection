import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { UserDataRequestService } from '../../../../core/services/server-services/user-data-request.service';
import { UserPanelStateService } from '../services/user-panel-state/user-panel-state.service';
import { IUserPanelState } from '../../../../interfaces/user-panel-state.interface';
import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    LoaderOverlayComponent, 
    NgIf, 
    ButtonComponent, 
    ChangePasswordComponent,
    RouterOutlet,
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {
  public username!: string;
  public isAdmin = false;
  public showMenuItems = false;
  public showLoader = true;
  @ViewChild('infoMessage') infoMessageElement!: ElementRef;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userDataRequestService: UserDataRequestService,
    private readonly authenticationService: AuthenticationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly userPanelState: UserPanelStateService,
  ) { }

  ngOnInit(){
    this.username = this.activeRoute.snapshot.params['id'];
    if (this.username == 'admin') { this.isAdmin = true; }

    console.log(this.username);

    this.userDataRequestService.checkPassword(this.username, "")
    .subscribe({
      next: (response) => {
        if (response) {
          this.showLoader = false;
          this.router.navigate([`user/${this.username}/change-password`],
              { state: {username: this.username}}
          );
          this.infoMessageElement.nativeElement.textContent ='Введите новый пароль'
          this.changeDetectorRef.markForCheck();
        } else {
          this.showLoader = false;
          this.showMenuItems = true;
          this.changeDetectorRef.markForCheck();
        }
      },
      error: (error) => {
        this.authenticationService.logout();
        this.router.navigate(['home']);
      }
    });

    this.userPanelState.state$.subscribe({
      next: (data: IUserPanelState) => {
        this.responseUpdateState(data);
      }
    })
  }

  onMenuPanelClick(event: Event) {
    const target = (event.target as HTMLElement).closest('[data-action]');;
    
    if (target) {
      const action = target.getAttribute('data-action');
      switch (action) {
        case 'change-password':
          this.router.navigate([`user/${this.username}/change-password`],
            { state: {username: this.username}}
          );
          break;
        
        case 'add-user':
          this.router.navigate([`user/${this.username}/add-user`],
            { state: {username: this.username}}
          );
          break;
  
        case 'logout':
          this.authenticationService.logout();
          this.router.navigate(['home']);
          break;
      }
    }


  }

  private responseUpdateState(data: IUserPanelState): void {
    if (data?.passwordUpdate) {
      if (this.isAdmin && !this.showMenuItems) { this.showMenuItems = true; }
      this.infoMessageElement.nativeElement.textContent = 'Пароль успешно обновлен';
    }

    if (data?.newUser) {
      this.infoMessageElement.nativeElement.textContent = `Добавлен новый пользователь ${data.newUser}`;
    }
  }

}
