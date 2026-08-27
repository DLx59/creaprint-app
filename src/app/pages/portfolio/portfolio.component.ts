import { Component, ChangeDetectionStrategy, computed, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaComponent } from '../../features/shared/components/media/media.component';
import { RevealOnScrollDirective } from '../../features/shared/directives/reveal-on-scroll.directive';
import { PortfolioItem } from './portfolio.model';

const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  { id: 1, title: 'Identité visuelle - Smart\'ly', category: 'Logo', img: 'assets/img/portfolio/logo-1.jpg' },
  { id: 2, title: 'Refonte logo - LDR Gestion', category: 'Logo', img: 'assets/img/portfolio/logo-2.jpg' },
  { id: 3, title: 'Campagne flyers - Foire du livre', category: 'Publicité', img: 'assets/img/portfolio/pub-1.jpg' },
  { id: 4, title: 'Roll-up salon professionnel', category: 'Publicité', img: 'assets/img/portfolio/pub-2.jpg' },
  { id: 5, title: 'Packaging fêtes - coffret cadeau', category: 'Packaging', img: 'assets/img/portfolio/packaging-1.jpg' },
  { id: 6, title: 'Étuis produits bio', category: 'Packaging', img: 'assets/img/portfolio/packaging-2.jpg' },
  { id: 7, title: 'Catalogue cosmétique', category: 'Catalogue', img: 'assets/img/portfolio/catalogue-1.jpg' },
  { id: 8, title: 'Magazine institutionnel', category: 'Catalogue', img: 'assets/img/portfolio/catalogue-2.jpg' },
  { id: 9, title: 'Site vitrine - bijouterie', category: 'Web', img: 'assets/img/portfolio/web-1.jpg' },
  { id: 10, title: 'Newsletter e-commerce', category: 'Web', img: 'assets/img/portfolio/web-2.jpg' }
] as const;

const CATEGORIES = ['Tous', 'Logo', 'Publicité', 'Packaging', 'Catalogue', 'Web'] as const;

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, MediaComponent, RevealOnScrollDirective],
  templateUrl: './portfolio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  public readonly categories: readonly string[] = CATEGORIES;
  public readonly activeCategory = signal<string>('Tous');

  private readonly items: Signal<readonly PortfolioItem[]> = signal(PORTFOLIO_ITEMS);

  public readonly filteredItems: Signal<readonly PortfolioItem[]> = computed(() => {
    const category = this.activeCategory();
    const items = this.items();
    return category === 'Tous' ? items : items.filter(item => item.category === category);
  });

  public setCategory(category: string): void {
    this.activeCategory.set(category);
  }
}
