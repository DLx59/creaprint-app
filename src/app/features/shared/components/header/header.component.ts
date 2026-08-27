import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly mobileMenuOpen = signal(false);

  public toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  public closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
