import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.interface';

@Component({
  selector: 'app-employee-hierarchy',
  templateUrl: './employee-hierarchy.component.html',
  imports: [CommonModule],
})
export class EmployeeHierarchyComponent implements OnInit {
  employees: any[] = [];

  ngOnInit() {
    this.employees = [
      {
        id: 1,
        name: 'John Doe',
        designation: 'CEO',
        isExpanded: false,
        subordinates: [
          {
            id: 2,
            name: 'Jane Smith',
            designation: 'VP - Engineering',
            isExpanded: false,
            subordinates: [
              {
                id: 3,
                name: 'Alice Johnson',
                designation: 'Engineering Manager',
                isExpanded: false,
                subordinates: [
                  {
                    id: 4,
                    name: 'Bob Brown',
                    designation: 'Software Engineer',
                    isExpanded: false,
                    subordinates: []
                  }
                ]
              },
              {
                id: 5,
                name: 'Charlie Davis',
                designation: 'Engineering Manager',
                isExpanded: false,
                subordinates: []
              }
            ]
          },
          {
            id: 6,
            name: 'Tom Wilson',
            designation: 'VP - Sales',
            isExpanded: false,
            subordinates: []
          }
        ]
      }
    ];
  }

  toggleExpand(employee: any) {
    employee.isExpanded = !employee.isExpanded;
  }

  getSubordinatesCount(emp: any): number {
    if (!emp.subordinates) return 0;
    return emp.subordinates.length + emp.subordinates.reduce((acc: number, sub: any) => acc + this.getSubordinatesCount(sub), 0);
  }

 expandAllRows(empId: number): void {
  this.expandParents(this.employees, empId);
}

private expandParents(employees: Employee[], empId: number): boolean {
  for (const emp of employees) {
    // if this is the target employee
    if (emp.id === empId) {
      return true;
    }

    // if target exists in this employee's subordinates
    if (this.expandParents(emp.subordinates, empId)) {
      // mark this employee expanded because one of its children matched
      emp.isExpanded = true;
      return true;
    }
  }

  // not found in this branch
  return false;
}
}
