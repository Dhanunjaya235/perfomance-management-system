export interface Employee {
  id: number;
  name: string;
  designation: string;
  reportingManager?:string | null;
  subordinates: Employee[];
  isExpanded: boolean;
}
