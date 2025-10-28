import { Employee } from "../employee.interface";

interface FlatEmployee {
  employee_id: number;
  name: string;
  email: string;
  reportsTo: string | null;
  designation?: string;
}

export function buildEmployeeHierarchy(flatList: FlatEmployee[]): Employee[] {
  const employeeMap: Record<string, Employee> = {};

  flatList.forEach(emp => {
    employeeMap[emp.name] = {
      id: emp.employee_id,
      name: emp.name,
      designation: emp.designation || '',
      reportingManager: emp.reportsTo || null,
      subordinates: [],
      isExpanded: false
    };
  });

  const roots: Employee[] = [];

  Object.values(employeeMap).forEach(emp => {
    const managerName = emp.reportingManager;
    if (managerName && employeeMap[managerName]) {
      employeeMap[managerName].subordinates.push(emp);
      delete employeeMap[emp.name];
    } else {
      roots.push(emp);
    }
  });
  return roots;
}
