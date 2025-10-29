import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeHierarchyComponent } from '../employee-hierarchy/employee-hierarchy.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Shield,LayoutDashboardIcon,CalendarSyncIcon } from 'lucide-angular';
import { CycleManagement } from '../components/cycle-management/cycle-management';



@Component({
  selector: 'app-side-nav',
  standalone: true,
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  imports: [CommonModule,EmployeeHierarchyComponent,RouterOutlet, RouterLink, RouterLinkActive,LucideAngularModule,CycleManagement] 
})
export class SideNav {
  isOpen = false;
  readonly shieldIcon=Shield;
  readonly dashboardIcon=LayoutDashboardIcon;
  readonly calendarIcon=CalendarSyncIcon;

  menuItems = [
    { label: 'Dashboard', icon:this.dashboardIcon, route: '/employee-hierarchy' },
    { label: 'Cycle Management', icon:this.calendarIcon, route: '/cycle-management' },
    { label: 'Role Configuration', icon:this.shieldIcon, route: '/role-config' },
  ];

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  openSidenav() {
    this.isOpen = true;
  }

  closeSidenav() {
    this.isOpen = false;
  }
  trackByFn(index: number, item: any): any {
    return item.label || index;
  } 
}
