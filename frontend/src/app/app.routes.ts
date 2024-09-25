import { Routes } from '@angular/router';
import { LogINComponent } from './modules/logging/components/log-in/log-in.component';
import { WelcomePageComponent } from './modules/welcome-page/components/welcome-page/welcome-page.component';
import { UserPanelComponent } from './modules/users-panel/components/user-panel/user-panel.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { LogInGuard } from './core/guards/log-in.guard';
import { ChangePasswordComponent } from './modules/users-panel/components/change-password/change-password.component';
import { DescriptionComponent } from './modules/users-panel/components/description/description.component';
import { AddUserComponent } from './modules/users-panel/components/add-user/add-user.component';

export const routes: Routes = [
    
    {
        path: 'home',
        component: WelcomePageComponent,
    },
    
    {
        path: 'log-in',
        component: LogINComponent,
        canActivate: [LogInGuard]
    },

    {
        path: 'user/:id',
        component: UserPanelComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'description', component: DescriptionComponent },
            { path: 'add-user', component: AddUserComponent },

        ]
        
    },
    
    {
        path: '**',
        component: WelcomePageComponent,
    },
];
