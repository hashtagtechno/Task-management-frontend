import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule,FormsModule
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent {
  @Output() selectedItemsList = new EventEmitter();
  @Input() list!:any;
  dropdownTitle = 'Projects';
  searchText = '';
  showDropDown = false;
  selectedItems: { id: number; name: string; }[] = [];


  modelChanged(searchText: string) {
  }
ngOnInit(){
}
  getSelectedValue(isChecked: boolean, item: any) {
    if (isChecked) {
      // Prevent duplicates based on `id`
      const exists = this.selectedItems.some(i => i.id === item.id);
      if (!exists) {
        this.selectedItems.push({ id: item.id, name: item.projectName });
        this.selectedItemsList.emit(this.selectedItems);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      this.selectedItemsList.emit(this.selectedItems);
    }
}
}