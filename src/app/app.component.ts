import { Component, inject, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './features/shared/components/header/header.component';
import { FooterComponent } from './features/shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'creaprint';
  showScrollTop = false;
  private router = inject(Router);
  private doc = inject(DOCUMENT);
  private isBrowser = typeof window !== 'undefined';

  constructor() {
    effect(() => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          let pageTitle = 'Créaprint';
          if (event.urlAfterRedirects === '/services') pageTitle = 'Services | Créaprint';
          else if (event.urlAfterRedirects === '/contact') pageTitle = 'Contact | Créaprint';
          else if (event.urlAfterRedirects === '/') pageTitle = 'Accueil | Créaprint';
          this.doc.title = pageTitle;
          
          let metaDesc = this.doc.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = this.doc.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            this.doc.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', 'Création graphique, web, print, identité visuelle, site internet, newsletter, référencement naturel. Service rapide, moderne et efficace.');
        }
      });
    });
    
    if (this.isBrowser) {
      window.addEventListener('scroll', () => {
        this.showScrollTop = window.scrollY > 300;
      });
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
