import { Component, HostListener, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesCarouselComponent } from '../../features/home/components/services-carousel/services-carousel.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ServicesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  featherOffset = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const maxOffset = 100;
    this.featherOffset = Math.min(scrollY * 0.4, maxOffset);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animateAllHeroLetters();
      }, 100);
    }
  }

  private animateAllHeroLetters(): void {
    if (typeof document === 'undefined') return;

    // Récupère tous les spans dans l'ordre d'apparition
    const allSpans: HTMLElement[] = Array.from(document.querySelectorAll('.home-hero-animate span'));

    // Initialiser toutes les lettres comme invisibles
    gsap.set(allSpans, {
      opacity: 0,
      y: 50,
      scale: 0.8
    });

    // On prépare la timeline
    const tl = gsap.timeline();

    allSpans.forEach((span: HTMLElement) => {
      let anim: gsap.TweenVars = { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power1.out" };

      switch (span.className) {
        case 'c':
          anim = { opacity: 1, y: 0, scale: 1, rotationX: 360, rotation: 0, rotationY: 0, color: "#ff7f32", transformOrigin: "center center", duration: 1, ease: "back.out(2)" };
          break;
        case 'r':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#6f42c1", duration: 0.5, ease: "elastic.out(1, 0.5)" };
          break;
        case 'r2':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#ff7f32", duration: 0.5, ease: "elastic.out(1, 0.5)" };
          break;
        case 'r3':
        case 'r4':
          break;
        case 'e':
          anim = { opacity: 1, y: 0, scale: 1, rotationY: 360, rotation: 0, rotationX: 0, color: "#00b894", duration: 0.4, ease: "power2.out" };
          break;
        case 'e2':
        case 'e3':
        case 'e4':
        case 'e5':
        case 'e6':
        case 'e7':
        case 'e8':
        case 'e9':
          break;
        case 'a':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#fdcb6e", duration: 0.6, ease: "bounce.out" };
          break;
        case 'p':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#0984e3", duration: 0.5, ease: "expo.out" };
          break;
        case 'p2':
          break;
        case 'i':
          anim = { opacity: 1, y: 0, scale: 1, rotationX: 0, rotation: 0, rotationY: 0, color: "#00b894", duration: 0.4, ease: "power2.out" };
          break;
        case 'i2':
        case 'i3':
        case 'i4':
          break;
        case 'n':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#636e72", duration: 0.5, ease: "expo.out" };
          break;
        case 'n2':
        case 'n3':
          break;
        case 'o':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.5, ease: "expo.out" };
          break;
        case 't':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#fd79a8", duration: 0.5, ease: "back.out(1.7)" };
          break;
        case 't2':
        case 't3':
        case 't4':
        case 't5':
          break;
        case 'v':
        case 'v2':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "expo.out" };
          break;
        case 's':
          anim = { opacity: 1, y: 0, scale: 1,rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'u':
          anim = { opacity: 1, y: 0, scale: 1,rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'l':
        case 'l2':
          anim = { opacity: 1, y: 0, scale: 1,rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'x':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'd':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'virg':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, color: "#6f42c1", duration: 0.1, ease: "power2.out" };
          break;
        case 'espace':
        case 'espace2':
        case 'espace3':
        case 'espace4':
        case 'espace5':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1 };
          break;
        default:
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.2, ease: "power1.out" };
      }

      tl.to(span, anim);
    });
  }
}
