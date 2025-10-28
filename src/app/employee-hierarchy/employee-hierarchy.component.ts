import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
}
