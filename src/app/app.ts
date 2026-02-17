import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bacoy');
}
