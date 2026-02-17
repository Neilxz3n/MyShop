import { Component } from '@angular/core';
import { Products } from './products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  cartCount = 0;
  totalPrice = 0;

  updateCart(product: any) {
    this.cartCount++;
    this.totalPrice += product.price;
  }

}
