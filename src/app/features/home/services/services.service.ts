import { Injectable, signal, computed, Signal, WritableSignal } from '@angular/core';

export interface Service {
  readonly icon: string;
  readonly img: string;
  readonly title: string;
  readonly desc: string;
  readonly price: string;
  readonly points?: readonly string[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly _services: WritableSignal<readonly Service[]> = signal<readonly Service[]>([
    {
      icon: 'bi bi-brush',
      img: 'assets/service-logo.png',
      title: 'Logo',
      desc: 'Logos sur-mesure pour le web et l\'impression. Modernisation et amélioration de logos existants.',
      price: 'Àpd 180 €HT',
      points: [
        'Création sur-mesure',
        'Déclinaisons tous supports',
        'Livraison vectorielle',
        'Modernisation de logo existant'
      ]
    },
    {
      icon: 'bi bi-megaphone',
      img: 'assets/service-pub.png',
      title: 'Publicité',
      desc: 'Conception de supports publicitaires impactants : flyers, affiches, annonces presse, roll-ups…',
      price: 'Àpd 120€ HT',
      points: [
        'Design attractif',
        'Formats variés',
        'Prêt à imprimer',
        'Conseil sur le choix du support'
      ]
    },
    {
      icon: 'bi bi-box-seam',
      img: 'assets/service-packaging.png',
      title: 'Packaging',
      desc: 'Création de boîtes, étuis, tubes, sachets, sets de table, lettrage vitrine et véhicule.',
      price: 'Àpd 105€ HT',
      points: [
        'Création originale',
        'Respect des contraintes techniques',
        "Fichiers prêts pour l'impression",
        'Lettrage vitrine et véhicule'
      ]
    },
    {
      icon: 'bi bi-journal-richtext',
      img: 'assets/service-catalogue.png',
      title: 'Catalogue',
      desc: 'De la création à la mise en page, fichiers HD prêts à imprimer.',
      price: 'Àpd 50€ HT la page A4',
      points: [
        'Mise en page professionnelle',
        'Gestion des contenus',
        'Optimisation impression',
        'Fichiers HD pour imprimeur'
      ]
    },
    {
      icon: 'bi bi-globe2',
      img: 'assets/service-site-internet.png',
      title: 'Web',
      desc: 'Création de sites web personnalisés, optimisés pour le référencement naturel.<br>Conception de newsletters originales et prêtes à l\'envoi.',
      price: 'Àpd 225€ HT la newsletter',
      points: [
        'Site responsive',
        'Référencement naturel',
        'Campagnes e-mailing',
        'Design personnalisé'
      ]
    }
  ]);

  public readonly services: Signal<readonly Service[]> = this._services.asReadonly();
  public readonly totalServices: Signal<number> = computed((): number => this._services().length);

  public getServiceByIndex(index: number): Service | undefined {
    const services: readonly Service[] = this._services();
    return services[index];
  }

  public getTotalServices(): number {
    return this._services().length;
  }
} 