import { Component } from '@angular/core';
import { CycleForm } from '../cycle-form/cycle-form';
import { CycleInfo } from '../cycle-info/cycle-info';

@Component({
  selector: 'app-cycle-management',
  imports: [CycleForm,CycleInfo],
  templateUrl: './cycle-management.html',
  styleUrl: './cycle-management.css'
})
export class CycleManagement {
  openAddCycleModal:boolean=false;
  cycleData:any=null;

    toggleDrawer() {
    this.openAddCycleModal = !this.openAddCycleModal;
  }

  closeDrawer() {
    this.openAddCycleModal = false;
  }
  editCycle(cycle: any) {
    this.openAddCycleModal = true;
    this.cycleData = cycle;
  }


}
