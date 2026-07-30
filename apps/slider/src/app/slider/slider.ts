import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ProjectSlide } from '../project-slide.model';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'region',
    'aria-roledescription': 'carousel',
    '[attr.aria-label]': 'ariaLabel()',
    tabindex: '0',
    '(mouseenter)': 'pause()',
    '(mouseleave)': 'resume()',
    '(focusin)': 'pause()',
    '(focusout)': 'resume()',
    '(keydown.arrowleft)': 'prev()',
    '(keydown.arrowright)': 'next()',
  },
})
export class SliderComponent {
  slides = input<ProjectSlide[]>([]);
  ariaLabel = input('Project showcase', { alias: 'label' });
  autoplay = input(true);
  autoplayIntervalMs = input(6000);

  private readonly destroyRef = inject(DestroyRef);

  private readonly activeIndex = signal(0);
  private readonly paused = signal(false);
  private timerId: ReturnType<typeof setInterval> | undefined;

  readonly current = this.activeIndex.asReadonly();
  readonly activeSlide = computed(() => this.slides()[this.activeIndex()]);
  readonly slideCount = computed(() => this.slides().length);

  constructor() {
    effect((onCleanup) => {
      const shouldRun =
        this.autoplay() && !this.paused() && this.slideCount() > 1;
      if (shouldRun) {
        this.timerId = setInterval(() => this.next(), this.autoplayIntervalMs());
      }
      onCleanup(() => clearInterval(this.timerId));
    });

    effect(() => {
      const count = this.slideCount();
      if (count > 0 && this.activeIndex() >= count) {
        this.activeIndex.set(0);
      }
    });

    this.destroyRef.onDestroy(() => clearInterval(this.timerId));
  }

  goTo(index: number): void {
    const count = this.slideCount();
    if (count === 0) return;
    this.activeIndex.set(((index % count) + count) % count);
  }

  next(): void {
    this.goTo(this.activeIndex() + 1);
  }

  prev(): void {
    this.goTo(this.activeIndex() - 1);
  }

  pause(): void {
    this.paused.set(true);
  }

  resume(): void {
    this.paused.set(false);
  }
}
