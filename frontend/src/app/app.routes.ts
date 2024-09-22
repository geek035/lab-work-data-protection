import { Routes } from '@angular/router';
import { LogINComponent } from './modules/logging/components/log-in/log-in.component';
import { WelcomePageComponent } from './modules/welcome-page/components/welcome-page/welcome-page.component';
import { UserPanelComponent } from './modules/users-panel/components/user-panel/user-panel.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
    
    {
        path: 'home',
        component: WelcomePageComponent,
    },
    
    {
        path: 'log-in',
        component: LogINComponent
    },

    {
        path: 'user/:id',
        component: UserPanelComponent,
        canActivate: [AuthenticationGuard],
    },
    
    {
        path: '**',
        component: WelcomePageComponent,
    },
];
