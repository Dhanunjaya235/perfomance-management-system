import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'pmsDatePipe'
})
export class PmsDatePipe implements PipeTransform{
     monthNames:string[]=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    transform(value:string):string{
        if(!value) return '';
        const date=new Date(value);
        const day=date.getDate().toString().padStart(2,'0');
        const month=(date.getMonth()+1).toString().padStart(2,'0');
        const year=date.getFullYear();
        return  `${day}-${this.monthNames[parseInt(month)-1]}-${year}`;
    }
}
