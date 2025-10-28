export interface Employee {
  id: number;
  name: string;
  designation: string;
  reportingManager:string;
  subordinates: Employee[];
  isExpanded: boolean;
}
