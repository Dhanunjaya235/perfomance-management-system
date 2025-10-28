import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../employee.interface';

@Component({
  selector: '[app-employee-row]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-row.component.html'
})
export class EmployeeRowComponent {
  @Input() employee!: Employee;
  @Input() level: number = 0;

  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  getSubordinatesCount(employee: Employee): number {
    let count = employee.subordinates.length;
    employee.subordinates.forEach(sub => {
      count += this.getSubordinatesCount(sub);
    });
    return count;
  }
}
