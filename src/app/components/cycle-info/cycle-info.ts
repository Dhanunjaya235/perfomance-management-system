import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule,Edit,Delete} from 'lucide-angular';
import { PmsDatePipe } from '../../pipes/pms-date-pipe';
import { PmsIconsService } from '../../services/pms-icons.service';

@Component({
  selector: 'app-cycle-info',
  imports: [CommonModule,LucideAngularModule,PmsDatePipe],
  providers:[],
  templateUrl: './cycle-info.html',
  styleUrl: './cycle-info.css'
})
export class CycleInfo {

  constructor(private iconService:PmsIconsService){}
  readonly editIcon=this.iconService.editIcon;
  readonly deleteIcon=this.iconService.deleteIcon;
  @Output() emitEditCycleEvent=new EventEmitter<any>();
   cycles = [
    {
      id: 1,
      name: 'Annual Performance Cycle 2025',
      startDate: new Date(2025, 0, 1),
      endDate: new Date(2025, 11, 31),
      cycleType: 'Annual',
      employees: ['John', 'Jane', 'Alice'],
    },
    {
      id: 2,
      name: 'Mid-Year Review Cycle',
      startDate: new Date(2025, 5, 1),
      endDate: new Date(2025, 6, 30),
      cycleType: 'Bi-Annual',
      employees: ['Bob', 'Charlie'],
    },
  ];

  openDrawer() {
    console.log('Open drawer to add a new cycle');
  }

  editCycle(cycle: any) {
    console.log(cycle)
    
    this.emitEditCycleEvent.emit(cycle);
  }

  deleteCycle(cycle: any) {
    if (confirm(`Are you sure you want to delete "${cycle.name}"?`)) {
      this.cycles = this.cycles.filter(c => c.id !== cycle.id);
    }
  }

  trackByFn(index: number, item: any) {
    return item.id || index;
  }

}
