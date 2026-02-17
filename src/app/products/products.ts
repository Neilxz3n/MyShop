import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {

  selectedCategory: string = 'All';
  cartCount: number = 0;
  totalPrice: number = 0;

  products = [
    {
      name: 'T-Shirt 1',
      price: 500,
      category: 'Men',
      available: true,
      image: 'assets/t1.jpg'
    },
    {
      name: 'T-Shirt 2',
      price: 600,
      category: 'Women',
      available: true,
      image: 'assets/t2.jpg'
    },
    {
      name: 'T-Shirt 3',
      price: 450,
      category: 'Men',
      available: false,
      image: 'assets/t3.jpg'
    },
    {
      name: 'T-Shirt 4',
      price: 700,
      category: 'Unisex',
      available: true,
      image: 'assets/t4.jpg'
    }
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => 
      product.category === this.selectedCategory
    );
  }

  addToCart(product: any) {
    if (product.available) {
      this.cartCount++;
      this.totalPrice += product.price;
      alert(product.name + ' added to cart!');
    }
  }

}
