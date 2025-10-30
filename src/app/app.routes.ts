import { Routes } from '@angular/router';
import { EmployeeHierarchyComponent } from './employee-hierarchy/employee-hierarchy.component';
import { MsalGuard } from '@azure/msal-angular';


export const routes: Routes = [
  { path: '', redirectTo: 'employee-hierarchy', pathMatch: 'full' },
  { path: 'employee-hierarchy', component: EmployeeHierarchyComponent, canActivate: [MsalGuard] },
  { path: 'role-config', loadComponent: () => import('./components/role-config/role-config').then(m => m.RoleConfigurationComponent), canActivate: [MsalGuard] },
  { path: 'cycle-management', loadComponent: () => import('./components/cycle-management/cycle-management').then(m => m.CycleManagement), canActivate: [MsalGuard] }
];
