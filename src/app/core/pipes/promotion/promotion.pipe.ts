import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promotion',
})
export class PromotionPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    console.log('Valeur entrée dans le PromotionPipe :', value);
    const result = value == null ? 0 : value;
    console.log('Résultat calculé par PromotionPipe :', result);
    return result;
  }
}
