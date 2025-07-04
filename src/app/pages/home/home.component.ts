import { Component, HostListener } from '@angular/core';
import { ServicesCarouselComponent } from '../../features/home/components/services-carousel/services-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ServicesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featherOffset = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const maxOffset = 200;
    const scrollY = window.scrollY || window.pageYOffset;
    this.featherOffset = Math.min(scrollY * 0.4, maxOffset);
  }
}
