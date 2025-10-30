import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PmsSearchDropdown } from '../../common/pms-search-dropdown/pms-search-dropdown';
import { PmsIconsService } from '../../services/pms-icons.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cycle-form',
  standalone: true,
  imports: [FormsModule, CommonModule, PmsSearchDropdown, LucideAngularModule],
  providers: [PmsIconsService],
  templateUrl: './cycle-form.html',
  styleUrls: ['./cycle-form.css']
})
export class CycleForm {
  @Output() closeDrawerEvent = new EventEmitter<void>();
  @Input() isOpen: boolean = false;
  @Input() cycleData: any = null;

  readonly closeIcon = this.iconService.closeIcon;

  constructor(private iconService: PmsIconsService) {}

  // Form data model
  formData = {
    startDate: '',
    endDate: '',
    name: '',
    description: '',
    comments: '',
    cycleType: '',
    eligibleEmployees: [] as any[]
  };

  employeeList: any[] = [
    { id: 1, name: 'John Doe', designation: 'Manager' },
    { id: 2, name: 'Jane Smith', designation: 'Engineer' },
    { id: 3, name: 'Alice Johnson', designation: 'Developer' },
  ];

  cycleTypes = ['Annual', 'Bi-Annual', 'Quarterly'];

  // ✅ Handle prefill on edit
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cycleData'] && this.cycleData) {
      this.formData = {
        ...this.formData,
        ...this.cycleData, // merge existing form with incoming data
      };

      // If your date fields come as timestamps, convert them to input-friendly format
      if (this.cycleData.startDate) {
        this.formData.startDate = this.formatDate(this.cycleData.startDate);
      }
      if (this.cycleData.endDate) {
        this.formData.endDate = this.formatDate(this.cycleData.endDate);
      }
    }
  }

  formatDate(dateValue: any): string {
    const date = new Date(dateValue);
    return date.toISOString().substring(0, 10); // yyyy-MM-dd format for input[type=date]
  }

  onEmployeesSelected(selected: any[]) {
    this.formData.eligibleEmployees = selected;
  }

  submitForm() {
    console.log('Form Submitted:', this.formData);
    this.closeDrawerEvent.emit();
  }

  closeDrawer() {
    this.closeDrawerEvent.emit();
  }
}
