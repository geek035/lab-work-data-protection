import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { ActivatedRoute } from '@angular/router';
import { LoaderOverlayComponent } from "../../../../shared/components/loader-overlay/loader-overlay.component";
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { UserDataRequestService } from '../../../../core/services/server-services/user-data-request.service';
import { HttpClient, HttpContext } from '@angular/common/http';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [AdminPanelComponent, LoaderOverlayComponent, NgIf, ButtonComponent, ChangePasswordComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {
  public username!: string;
  public showLoader = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userDataRequestService: UserDataRequestService,
    private readonly http: HttpClient,
  ) {
    this.route.params.subscribe(params => {
      this.username = params['id'];
      
      this.showLoader = false;
    });
  }

  public onClickHandler() {
    console.log("clicked");
    this.http.put("http://localhost:5000/api/users/add", "user1").subscribe({
      next: (response) => { console.log(response) }
    });
  }

  ngOnInit(){
  
  }
}
