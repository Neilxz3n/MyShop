import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  darkMode = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') this.darkMode.set(true);
      else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) this.darkMode.set(true);
    }
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const theme = this.darkMode() ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    });
  }

  toggle() { this.darkMode.update(v => !v); }
}
