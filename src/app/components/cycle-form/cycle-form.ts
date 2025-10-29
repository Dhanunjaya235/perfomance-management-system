import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PmsSearchDropdown } from '../../common/pms-search-dropdown/pms-search-dropdown';

@Component({
  selector: 'app-cycle-form',
  imports: [FormsModule,CommonModule,PmsSearchDropdown],
  templateUrl: './cycle-form.html',
  styleUrl: './cycle-form.css'
})
export class CycleForm {
  

  @Output() closeDrawerEvent=new EventEmitter<void>();
  @Input() isOpen:boolean=false;
  @Input() cycleData:any=null;

  // form fields
  formData = {
    startDate: '',
    endDate: '',
    name: '',
    description: '',
    comments: '',
    cycleType: '',
    eligibleEmployees: [] as any[]
  };

  // dummy employee list
  employeeList:any[] = [
    { id: 1, name: 'John Doe', designation: 'Manager' },
    { id: 2, name: 'Jane Smith', designation: 'Engineer' },
    { id: 3, name: 'Alice Johnson', designation: 'Developer' },
  ];

  cycleTypes = ['Annual', 'Bi-Annual', 'Quarterly'];

  onEmployeesSelected(selected: any[]) {
    this.formData.eligibleEmployees = selected;
  }
  ngOnChanges() {
    if (this.cycleData) {
      this.formData = { ...this.cycleData }; // pre-fill the form
    }
  }


  submitForm() {
    console.log('Form Submitted:', this.formData);
    this.closeDrawerEvent.emit();
  }
  closeDrawer() {
    this.closeDrawerEvent.emit();
  }

}
