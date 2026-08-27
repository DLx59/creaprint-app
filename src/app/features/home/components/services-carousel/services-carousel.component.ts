import {AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, Signal, ViewChild, ViewChildren, ChangeDetectionStrategy} from '@angular/core';
import {HomeService, Service} from '../../services/home.service';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {isPlatformBrowser, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-services-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './services-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./services-carousel.component.scss']
})
export class ServicesCarouselComponent implements AfterViewInit {
  private static readonly CARD_SPACING_RATIO = 0.58;
  private static readonly SCALE_STEP = 0.22;
  private static readonly MIN_SCALE = 0.6;
  private static readonly OPACITY_STEP = 0.5;
  private static readonly MIN_OPACITY = 0.12;
  private static readonly SCROLL_DISTANCE_PER_CARD = 0.6;

  @ViewChildren('panel') public readonly panelsRef!: ElementRef<HTMLElement>[];
  @ViewChild('panelsWrapper') panelsWrapperRef!: ElementRef<HTMLElement>;

  private readonly servicesService: HomeService = inject(HomeService);
  private readonly platformId: object = inject(PLATFORM_ID);
  public readonly services: Signal<readonly Service[]> = this.servicesService.services;

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cards = this.panelsRef.map(ref => ref.nativeElement);
    const wrapper = this.panelsWrapperRef.nativeElement;
    const lastIndex = cards.length - 1;
    const cardStep = cards[0].getBoundingClientRect().width * ServicesCarouselComponent.CARD_SPACING_RATIO;

    const renderDeck = (progress: number): void => {
      const activeIndex = progress * lastIndex;
      cards.forEach((card: HTMLElement, i: number) => {
        const distance = i - activeIndex;
        const absDistance = Math.abs(distance);
        const scale = Math.max(ServicesCarouselComponent.MIN_SCALE, 1 - absDistance * ServicesCarouselComponent.SCALE_STEP);
        const opacity = Math.max(ServicesCarouselComponent.MIN_OPACITY, 1 - absDistance * ServicesCarouselComponent.OPACITY_STEP);
        gsap.set(card, { x: distance * cardStep, scale, opacity, zIndex: Math.round(100 - absDistance * 10) });
        card.classList.toggle('is-active', Math.round(activeIndex) === i);
      });
    };

    renderDeck(0);

    ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      scrub: 0.4,
      end: () => '+=' + lastIndex * window.innerHeight * ServicesCarouselComponent.SCROLL_DISTANCE_PER_CARD,
      snap: 1 / lastIndex,
      onUpdate: self => renderDeck(self.progress)
    });
  }
}
