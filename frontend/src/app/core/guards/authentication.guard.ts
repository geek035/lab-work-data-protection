import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AUTHENTICATION_STRATEGY, IAuthenticationService } from '../../interfaces/authentication.interface';
import { DecoderService } from '../services/decoder/decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    @Inject(AUTHENTICATION_STRATEGY) private readonly authenticationService: IAuthenticationService,
    private readonly decoder: DecoderService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
      
      if (this.authenticationService.isLoggedIn()) {
    
        const token = sessionStorage.getItem('token') as string;
        const username = this.decoder.getName(token);
        
        if (username == next.params['id']) {
          return true;
        }
      }
    
      this.router.navigate(['login']);
      return false;
  }
}
