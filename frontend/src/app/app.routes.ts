import { Routes } from '@angular/router';
import { LogINComponent } from './log-in/log-in.component';

export const routes: Routes = [
    {
        path: '**',
        component: LogINComponent,
    },

    {
        path: 'log-in',
        component: LogINComponent
    }
];
