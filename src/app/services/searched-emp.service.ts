import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchedEmpService {

  constructor() { }
  ngOnInit(): void {
    console.log('SearchedEmpService initialized');
  }
  private expandPathSource = new BehaviorSubject<number[]>([]); 
  expandPath$ = this.expandPathSource.asObservable();

  setExpandPath(path: number[]) {
   
    
    this.expandPathSource.next(path);
  }
}
