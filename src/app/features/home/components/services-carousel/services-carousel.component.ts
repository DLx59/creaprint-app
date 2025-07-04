import { Component, signal, computed, inject, Signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-services-carousel',
  standalone: true,
  imports: [NgClass],
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss']
})
export class ServicesCarouselComponent {
  private readonly servicesService: ServicesService = inject(ServicesService);
  
  private readonly _activeIndex: WritableSignal<number> = signal<number>(0);
  
  public readonly activeIndex: Signal<number> = this._activeIndex.asReadonly();
  public readonly services: Signal<readonly Service[]> = this.servicesService.services;
  public readonly totalServices: Signal<number> = this.servicesService.totalServices;

  public readonly visibleSlides: Signal<(Service | undefined)[]> = computed((): (Service | undefined)[] => {
    const totalServices: number = this.totalServices();
    const currentIndex: number = this._activeIndex();
    return [
      this.servicesService.getServiceByIndex((currentIndex - 1 + totalServices) % totalServices),
      this.servicesService.getServiceByIndex(currentIndex),
      this.servicesService.getServiceByIndex((currentIndex + 1) % totalServices)
    ];
  });

  public getVisibleIndex(offset: number): number {
    const totalServices: number = this.totalServices();
    return (this._activeIndex() + offset + totalServices) % totalServices;
  }

  public next(): void {
    const totalServices: number = this.totalServices();
    this._activeIndex.update((index: number): number => (index + 1) % totalServices);
  }
  
  public prev(): void {
    const totalServices: number = this.totalServices();
    this._activeIndex.update((index: number): number => (index - 1 + totalServices) % totalServices);
  }

  public goToSlide(index: number): void {
    this._activeIndex.set(index);
  }

  public getOffsetClass(offset: number): string {
    return offset === 0 ? 'carousel-center' : 'carousel-adjacent';
  }
}
