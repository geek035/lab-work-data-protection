import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { DecoderService } from '../services/decoder/decoder.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {
  
  constructor(
    private readonly decoder: DecoderService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token = sessionStorage.getItem('token');

    if (token) {
      const username = this.decoder.getName(token);
      this.router.navigate([`/user/${username}/description`]);
      return false;
    }

    return true;
  }


}
