import {AfterViewInit, Component, ElementRef, inject, Signal, ViewChild, ViewChildren} from '@angular/core';
import {HomeService, Service} from '../../services/home.service';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-services-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss']
})
export class ServicesCarouselComponent implements AfterViewInit {
  @ViewChildren('panel') public readonly panelsRef!: Array<ElementRef<HTMLElement>>
  @ViewChild('panelsWrapper') panelsWrapperRef!: ElementRef<HTMLElement>;

  private readonly servicesService: HomeService = inject(HomeService);
  public readonly services: Signal<readonly Service[]> = this.servicesService.services;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  public ngAfterViewInit() {
    const panels = this.panelsRef.map(ref => ref.nativeElement);
    const wrapper = this.panelsWrapperRef.nativeElement;
    wrapper.style.width = `${panels.length * 100}vw`;
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 0.1,
        end: () => "+=" + (wrapper.offsetWidth / 3),
        snap: 1 / (panels.length - 1),
        markers: true
      }
    });
  }
}
