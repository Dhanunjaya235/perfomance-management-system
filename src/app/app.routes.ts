import { Routes } from '@angular/router';
import { EmployeeHierarchyComponent } from './employee-hierarchy/employee-hierarchy.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employee-hierarchy', pathMatch: 'full' },
  { path: 'employee-hierarchy', component: EmployeeHierarchyComponent },
  { path: 'role-config', loadComponent: () => import('./components/role-config/role-config').then(m => m.RoleConfigurationComponent) },
  { path: 'cycle-management', loadComponent: () => import('./components/cycle-management/cycle-management').then(m => m.CycleManagement) }
];
