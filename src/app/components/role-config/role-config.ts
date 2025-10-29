import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PmsSearchDropdown } from '../../common/pms-search-dropdown/pms-search-dropdown';

interface Employee {
  id: number;
  name: string;
}

interface Configuration {
  employee: Employee;
  roles: string[];
}

@Component({
  selector: 'app-role-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule,PmsSearchDropdown],
  templateUrl: './role-config.html'
})
export class RoleConfigurationComponent {
  employees: Employee[] = [
    { id: 1, name: 'Thrinath Narahari' },
    { id: 2, name: 'Madhu Palli' },
    { id: 3, name: 'Rajeev Bandi' },
  ];

  availableRoles = ['Admin', 'Manager', 'Editor', 'Viewer'];

  searchText = '';
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  // roles
  selectedRoles: string[] = [];
  showRoleDropdown = false;

  configurations: Configuration[] = [];

  // 🔍 Filter employees
  filterEmployees() {
    const text = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) =>
      e.name.toLowerCase().includes(text)
    );
  }

  // 👤 Select employee
  onEmployeeSelected(emp: Employee) {
    this.selectedEmployee = emp;
    this.searchText = emp.name;
    this.filteredEmployees = [];
  }

  // ✅ Toggle role selection
  toggleRole(role: string) {
    const index = this.selectedRoles.indexOf(role);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }

  // 🟢 Check if role is selected
  isRoleSelected(role: string): boolean {
    return this.selectedRoles.includes(role);
  }

  // ➕ Add configuration
  addConfiguration() {
    if (!this.selectedEmployee || this.selectedRoles.length === 0) return;

    const existingConfig = this.configurations.find(
      (c) => c.employee.id === this.selectedEmployee?.id
    );

    if (existingConfig) {
      existingConfig.roles = [
        ...new Set([...existingConfig.roles, ...this.selectedRoles]),
      ];
    } else {
      this.configurations.push({
        employee: this.selectedEmployee,
        roles: [...this.selectedRoles],
      });
    }

    this.resetForm();
  }

  // 🗑️ Remove configuration
  removeConfig(index: number) {
    this.configurations.splice(index, 1);
  }

  // ✏️ Edit configuration
  editConfig(config: Configuration) {
    this.selectedEmployee = config.employee;
    this.searchText = config.employee.name;
    this.selectedRoles = [...config.roles];
  }

  // 🔄 Reset form
  resetForm() {
    this.searchText = '';
    this.selectedEmployee = null;
    this.selectedRoles = [];
    this.showRoleDropdown = false;
  }

  removeRole(role: string): void {
  const index = this.selectedRoles.indexOf(role);
  if (index > -1) {
    this.selectedRoles.splice(index, 1);
  }
}
trackByFn(index: number, item: any): any {
  return item.id || index;  
}
}
