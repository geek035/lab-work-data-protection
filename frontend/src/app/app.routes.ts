import { Routes } from '@angular/router';
import { LogINComponent } from './modules/logging/components/log-in/log-in.component';
import { WelcomePageComponent } from './modules/welcome-page/components/welcome-page/welcome-page.component';

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
        path: '**',
        component: WelcomePageComponent,
    },
];
