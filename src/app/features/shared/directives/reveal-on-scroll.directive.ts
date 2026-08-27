import { Directive, ElementRef, PLATFORM_ID, Renderer2, inject, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealOnScrollDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const host = this.elementRef.nativeElement;
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.renderer.addClass(host, 'is-visible');
              observer.unobserve(host);
            }
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(host);
    });
  }
}
