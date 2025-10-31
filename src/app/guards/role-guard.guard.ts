import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ROLE_CONFIG } from "../role-config";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate{

  constructor(private router:Router){}

  canActivate(route:ActivatedRouteSnapshot): boolean {

    const userRoles=['director'];
    if(userRoles.length===0){
      this.router.navigate(['/']);
      return false;
    } 
    const path=route.routeConfig?.path ?? '';
    const allowedRoutes = userRoles.flatMap(role => ROLE_CONFIG[role] || []);
    if (!allowedRoutes.includes(path)) {
      this.router.navigate(['/employee-hierarchy']);
      return false;
    }
    return true;
  }
    

}