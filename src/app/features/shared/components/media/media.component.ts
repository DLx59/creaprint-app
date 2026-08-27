import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [],
  templateUrl: './media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  public readonly src = input.required<string>();
  public readonly alt = input('');
  public readonly label = input('');
  public readonly icon = input('bi bi-image');
  public readonly ratio = input('1 / 1');
  public readonly shape = input<'square' | 'rounded' | 'circle'>('square');

  public readonly hasError = signal(false);

  public onError(): void {
    this.hasError.set(true);
  }
}
