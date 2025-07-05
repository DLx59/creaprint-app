import { Component, HostListener, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesCarouselComponent } from '../../features/home/components/services-carousel/services-carousel.component';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ServicesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  featherOffset = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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
        this.initDraggableFeather();
      }, 100);
    }
  }

  private initDraggableFeather(): void {
    if (typeof document === 'undefined') return;

    const featherElement = document.querySelector("#feather-abs");
    if (featherElement) {
      Draggable.create("#feather-abs", {
        type: "x,y",
        bounds: "body",
        inertia: true,
        snap: [10],
        onDrag: function () {
          console.log("drag");
        },
        onDragEnd: function () {
          console.log("dragEnd");
        }
      });
    }
  }

  private animateAllHeroLetters(): void {
    if (typeof document === 'undefined') return;

    const allSpans: HTMLElement[] = Array.from(document.querySelectorAll('.home-hero-animate span'));

    gsap.set(allSpans, {
      opacity: 0,
      y: 50,
      scale: 1
    });

    const tl = gsap.timeline();

    allSpans.forEach((span: HTMLElement, idx: number) => {
      let anim: gsap.TweenVars = { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power1.out" };
      switch (span.className) {
        case 'c':
          anim = { opacity: 1, y: 0, scale: 1, rotationX: 360, color: "#ff7f32", duration: 1, ease: "back.out(2)" };
          tl.to(span, anim);
          break;
        case 'r':
          anim = { x: -30, y: 0, opacity: 0, scaleX: -1 }
          tl.fromTo(span, anim, { x: 0, y: 0, opacity: 1, scaleX: -1, color: "#6f42c1", duration: 0.5, ease: "elastic" });
          tl.to(span, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, "+=0.1");
          break;
        case 'e':
          anim = { opacity: 1, x: 0, y: 0, scale: 1, color: "#00b894", duration: 0.5, ease: "sine.out" };
          tl.fromTo(span, { x: 0, y: -30, opacity: 0 }, anim, "-=1");
          break;
        case 'gsap-a':
          anim = { opacity: 0, x: 0, y: 50, scale: 0.1 };
          tl.fromTo(span, anim, { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out(0.5)" }, "-=0.5");
          tl.to(span, { rotation: 360, duration: 2, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, "-=0.8");
          tl.addLabel('afterGsapA');
          break;
        case 'a':
          const gsapA = allSpans[idx - 1];
          anim = { opacity: 0, x: -55, y: 100, scale: 0.1, color: "#fdcb6e" };
          tl.fromTo(span, anim, {
            opacity: 1, scale: 1, x: -67, y: 0, duration: 0.7, ease: "power3.out",
            onStart: () => {
              if (gsapA && gsapA.classList.contains('gsap-a')) {
                gsap.to(gsapA, {
                  y: -200,
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.2,
                  ease: "back.in(2)",
                });
              }
            }
          }, "-=0.8");
          break;
        case 'p':
          anim = { x: -67, y: -200, opacity: 0, }
          tl.fromTo(span, anim, { x: -67, y: 0, opacity: 1, color: "#0984e3", duration: 0.5, ease: "elastic" });
          break;
        case 'gsap-n':
          anim = { opacity: 0, x: 30, y: 50, scale: 0.1 };
          tl.fromTo(
            span,
            anim,
            { opacity: 1, scale: 1.5, duration: 0.8, ease: "bounce.out(0.5)" },
            "afterGsapA-=0.75"
          );
          tl.to(span, { rotation: 360, duration: 2, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, "-=0.8");
          break;
        case 'r2': {
          anim = {
            opacity: 0,
            rotationX: 150,
            y: 30,
            x: -135,
            color: "#fdcb6e",
            transformOrigin: "bottom center"
          };
          tl.fromTo(
            span,
            anim,
            {
              opacity: 1,
              rotationX: 0,
              y: 0,
              x: -135,
              duration: 0.7,
              ease: "expo.out"
            },
            "-=0.8"
          );
          break;
        }
        case 'i':
          anim = { x: -300, y: -300, rotate: 90, opacity: 0, }
          tl.fromTo(span, anim, { x: -135, y: 7, scale: 0.25, rotate: 0, opacity: 1, color: "#00b894", duration: 0.75, ease: "power4" });
          tl.to(span, { scale: 1, duration: 0.5, y: 0, ease: "power2.out" }, "-=0.1");
          break;
        case 'n': {
          const gsapN = allSpans[idx - 3];
          anim = { x: -180, y: 0, opacity: 0, clipPath: 'inset(0 100% 0 0)' };
          tl.fromTo(
            span,
            anim,
            {
              x: -135,
              y: 0,
              opacity: 1,
              color: "#636e72",
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.4,
              ease: "expo.out",
              onUpdate: function () {
                if (gsapN && gsapN.classList.contains('gsap-n')) {
                  const progress = this['totalProgress']();
                  const startX = 30;
                  const endX = 110;
                  const currentX = startX + (endX - startX) * progress;
                  gsap.set(gsapN, { x: currentX });
                }
              }
            }
          );
          break;
        }
        case 't':
          const gsapN = allSpans[idx - 4];
          anim = { x: -110, y: -300, opacity: 0, rotation: 90 }
          tl.fromTo(span, anim, { x: -110, y: 0, opacity: 1, color: "#fd79a8", duration: 0.5, ease: "back.out(1.7)", });
          if (gsapN && gsapN.classList.contains('gsap-n')) {
            tl.to(
              gsapN,
              {
                y: 300,
                scale: 1.1,
                opacity: 0,
                duration: 0.20,
                ease: "back.in"
              },
              "-=0.35"
            );
          }
          tl.to(span, { rotation: 0, duration: 0.5, x: -135, ease: "back.out(1.7)" });
          break;
        case 'r3':
        case 'r4':
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
        case 'p2':
          break;
        case 'i2':
        case 'i3':
        case 'i4':
          break;
        case 'n2':
        case 'n3':
          break;
        case 'o':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.5, ease: "expo.out" };
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
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'u':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
          break;
        case 'l':
        case 'l2':
          anim = { opacity: 1, y: 0, scale: 1, rotation: 0, rotationX: 0, rotationY: 0, duration: 0.1, ease: "power2.out" };
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
          tl.to(span, anim);
      }
    });
  }
}
