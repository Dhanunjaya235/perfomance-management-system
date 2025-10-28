import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../employee.interface';
import { SearchedEmpService } from '../../services/searched-emp.service';
import { Subscription } from 'rxjs';

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
   private subscription!: Subscription;

  constructor(private treeService: SearchedEmpService) {}

   ngOnInit() {
    this.subscription = this.treeService.expandPath$.subscribe(path => {
      if (path.includes(this.employee.id)) {
        this.isExpanded = true;
      } else {
        this.isExpanded = false;
      }
    });
  }

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
   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
