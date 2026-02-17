import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  @Output() addProduct = new EventEmitter<any>();

  selectedCategory = 'All';

  products = [
    {
      name: 'T-Shirt 1',
      category: 'Men',
      price: 500,
      available: true,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    },
    {
      name: 'T-Shirt 2',
      category: 'Women',
      price: 600,
      available: true,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c'
    },
    {
      name: 'T-Shirt 3',
      category: 'Men',
      price: 450,
      available: false,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f'
    },
    {
      name: 'T-Shirt 4',
      category: 'Unisex',
      price: 700,
      available: true,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f'
    }
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(
      p => p.category === this.selectedCategory
    );
  }

  addToCart(product: any) {
    if (product.available) {
      this.addProduct.emit(product);
      alert(product.name + ' added to cart!');
    }
  }

}
