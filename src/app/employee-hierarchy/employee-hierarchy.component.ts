import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchedEmpService } from '../services/searched-emp.service';
import { EmployeeRowComponent } from './employee-row/employee-row.component';

@Component({
  selector: 'app-employee-hierarchy',
  templateUrl: './employee-hierarchy.component.html',
  imports: [CommonModule,FormsModule],
})
export class EmployeeHierarchyComponent implements OnInit {
  employees: any[] = [];
  searchedEmp:string='';
  filteredEmployees: any[] = [];

  constructor(private searchedEmpService: SearchedEmpService) { }


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
  // Flatten tree into a single list
  getAllEmployees(list: any[]): any[] {
    let result: any[] = [];
    for (let emp of list) {
      result.push(emp);
      if (emp.subordinates && emp.subordinates.length > 0) {
        result = result.concat(this.getAllEmployees(emp.subordinates));
      }
    }
    return result;
  }

  displaySearchedEmp() {
    const search = this.searchedEmp.toLowerCase();
    const allEmployees = this.getAllEmployees(this.employees);
    this.filteredEmployees = allEmployees.filter(emp =>
      emp.name.toLowerCase().includes(search)
    );
  }

  selectEmployee(emp: any) {
    this.searchedEmp = emp.name;
    this.filteredEmployees = [];
    const path = this.findPathToEmployee(this.employees, emp.id);
    
    if (path) {
      this.searchedEmpService.setExpandPath(path);
    }
  }

  toggleExpand(employee: any) {
    employee.isExpanded = !employee.isExpanded;
  }

  getSubordinatesCount(emp: any): number {
    if (!emp.subordinates) return 0;
    return emp.subordinates.length + emp.subordinates.reduce((acc: number, sub: any) => acc + this.getSubordinatesCount(sub), 0);
  }
  findPathToEmployee(list: any[], targetId: number, path: number[] = []): number[] | null {
    for (let emp of list) {
      const newPath = [...path, emp.id];
      if (emp.id === targetId) {
        return newPath;
      }
      if (emp.subordinates && emp.subordinates.length > 0) {
        const result = this.findPathToEmployee(emp.subordinates, targetId, newPath);
        if (result) return result;
      }
    }
    return null;
  }

}
