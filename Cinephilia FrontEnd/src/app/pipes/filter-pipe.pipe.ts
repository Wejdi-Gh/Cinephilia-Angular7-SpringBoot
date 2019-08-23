import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(array: any, shearchData?: any): any {

    if (array) {


      return array.filter(el => {

        if (shearchData) {

          if (el.title) { return el.title.toLowerCase().startsWith(shearchData.toLowerCase()) }

          if (el.original_name) { return el.original_name.toLowerCase().startsWith(shearchData.toLowerCase()) }


          if (el.name) {  return el.name.toLowerCase().startsWith(shearchData.toLowerCase()) }


        }

        else return el;
      })


    }
  }

}
