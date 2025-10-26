import { inject, Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from '../../core/service/markdown.service';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  #service = inject(MarkdownService)

  transform(value: string, ...args: unknown[]): string {
    return this.#service.parse(value)
  }

}
