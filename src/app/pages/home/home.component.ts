import { Component, HostListener, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesCarouselComponent } from '../../features/home/components/services-carousel/services-carousel.component';
import { inject } from '@angular/core';
import { HeroGsapService } from './hero-gsap.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ServicesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HeroGsapService]
})
export class HomeComponent implements AfterViewInit {
  public featherOffset: number = 0;
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _heroGsapService: HeroGsapService = inject(HeroGsapService);

  /**
   * Handles the window scroll event to update the feather offset.
   * @param event The scroll event.
   */
  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    const scrollY: number = window.scrollY;
    const maxOffset: number = 100;
    this.featherOffset = Math.min(scrollY * 0.4, maxOffset);
  }

  /**
   * Angular lifecycle hook. Triggers hero animations and feather drag after view initialization.
   */
  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout((): void => {
        this._heroGsapService.animateHero();
        this._heroGsapService.initDraggableFeather();
      }, 100);
    }
  }
}
