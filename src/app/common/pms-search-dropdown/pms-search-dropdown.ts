import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pms-search-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pms-search-dropdown.html',
  styleUrls: ['./pms-search-dropdown.css']
})
export class PmsSearchDropdown {
  @Input() list: any[] = [];
  @Input() placeholder: string = '';
  @Input() searchKey: string = '';
  @Input() multiSelect: boolean = false;
  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemsSelected = new EventEmitter<any[]>(); // ✅ Emit multiple

  searchedValue = '';
  filteredList: any[] = [];
  selectedItems: any[] = [];

  // ✅ Recursively flatten hierarchical data
  private flattenEmployees(list: any[]): any[] {
    const result: any[] = [];
    list.forEach(emp => {
      result.push(emp);
      if (emp.subordinates && emp.subordinates.length > 0) {
        result.push(...this.flattenEmployees(emp.subordinates));
      }
    });
    return result;
  }

  displaySearched() {
    const value = this.searchedValue.trim().toLowerCase();
    if (!value) {
      this.filteredList = [];
      return;
    }

    const flatList = this.flattenEmployees(this.list);
    this.filteredList = flatList.filter(item =>
      item[this.searchKey]?.toLowerCase().includes(value)
    );
  }

  // ✅ Handle select
  selectItem(item: any) {
    if (this.multiSelect) {
      const exists = this.selectedItems.find(i => i.id === item.id);
      if (exists) {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      } else {
        this.selectedItems.push(item);
      }
      this.itemsSelected.emit(this.selectedItems);
    } else {
      this.searchedValue = item[this.searchKey];
      this.filteredList = [];
      this.itemSelected.emit(item);
    }
  }

  // ✅ "Select All" handler
  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedItems = [];
    } else {
      this.selectedItems = [...this.filteredList];
    }
    this.itemsSelected.emit(this.selectedItems);
  }

  // ✅ Check if all items in the current filtered list are selected
  allSelected(): boolean {
    return (
      this.filteredList.length > 0 &&
      this.filteredList.every(f =>
        this.selectedItems.some(s => s.id === f.id)
      )
    );
  }

  isSelected(item: any): boolean {
    return this.selectedItems.some(i => i.id === item.id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
