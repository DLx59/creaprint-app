import { Component, AfterViewInit, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { HeroGsapService } from './hero-gsap.service';
import { ServicesCarouselComponent } from '../../features/home/components/services-carousel/services-carousel.component';
import { MediaComponent } from '../../features/shared/components/media/media.component';
import { RevealOnScrollDirective } from '../../features/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ServicesCarouselComponent, MediaComponent, RevealOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroGsapService]
})
export class HomeComponent implements AfterViewInit {
  public featherOffset = 0;
  private readonly _platformId: object = inject(PLATFORM_ID);
  private readonly _heroGsapService: HeroGsapService = inject(HeroGsapService);

  // /**
  //  * Handles the window scroll event to update the feather offset.
  //  * @param event The scroll event.
  //  */
  // @HostListener('window:scroll', ['$event'])
  // public onWindowScroll(event: Event): void {
  //   const scrollY: number = window.scrollY;
  //   const maxOffset: number = 100;
  //   this.featherOffset = Math.min(scrollY * 0.4, maxOffset);
  // }

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
