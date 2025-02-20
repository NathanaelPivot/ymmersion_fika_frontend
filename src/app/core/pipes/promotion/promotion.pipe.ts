import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'promotion',
})

export class PromotionPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    return value == null ? 0 : value;
  }
}
