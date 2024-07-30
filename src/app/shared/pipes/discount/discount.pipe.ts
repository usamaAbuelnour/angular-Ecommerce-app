import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(value: string, discount: number) {
    let discountAmount = Number(value) * (discount / 100)
    return Math.floor(Number(value) - discountAmount)
  }
}
