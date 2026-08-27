import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HomeService, Service } from '../../features/home/services/home.service';
import { RevealOnScrollDirective } from '../../features/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, RevealOnScrollDirective],
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  private readonly homeService = inject(HomeService);
  public readonly services: Signal<readonly Service[]> = this.homeService.services;
}
