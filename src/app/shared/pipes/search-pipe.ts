import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/api.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    if (!term) return products; 
    const lowerTerm = term.toLowerCase();

    return products.filter(product =>
      product.title.toLowerCase().includes(lowerTerm) ||
      product.category?.name.toLowerCase().includes(lowerTerm)
    );
  }
}
