import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchedEmpService } from '../services/searched-emp.service';
import { EmployeeRowComponent } from './employee-row/employee-row.component';
import { Employee } from '../employee.interface';
import { buildEmployeeHierarchy } from '../utils';
import { HttpClient } from '@angular/common/http';
import { PmsSearchDropdown } from '../common/pms-search-dropdown/pms-search-dropdown';
@Component({
  selector: 'app-employee-hierarchy',
  templateUrl: './employee-hierarchy.component.html',
  imports: [CommonModule,FormsModule,PmsSearchDropdown],
  standalone: true
})
export class EmployeeHierarchyComponent implements OnInit {
  employees: Employee[] = [];
  searchedEmp:string='';
  filteredEmployees: any[] = [];
  @ViewChildren('rowRef') rowElements!: QueryList<ElementRef<HTMLTableRowElement>>;

  constructor() {}

  ngOnInit(): void {
    this.employees =  [{
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
      }];
  }
   ngAfterViewInit() {
    // Watch when rows change (e.g., expand/collapse updates DOM)
    this.rowElements.changes.subscribe(() => {
      this.scrollToMatchedRow();
    });
  }

  ngOnChanges() {
    this.scrollToMatchedRow();
  }

  scrollToMatchedRow(): void {
    if (!this.searchedEmp) return;

    const match = this.rowElements.find(ref =>
      ref.nativeElement.innerText.toLowerCase().includes(this.searchedEmp.toLowerCase())
    );

    if (match) {
      match.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
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

  onEmployeeSelected(emp: any) {
    this.searchedEmp = emp.name;
    this.filteredEmployees = [];
    this.expandAllRows(emp.id);
    console.log('Selected Employee:', emp);
    this.scrollToMatchedRow();
  }

  toggleExpand(employee: any) {
    employee.isExpanded = !employee.isExpanded;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
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
