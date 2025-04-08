'use client';

import { makeAutoObservable } from 'mobx';
import type { Product } from '@/types/product';
import type { RootStore } from './types';
import { CartItem } from '@/types/app';

export class CartStore {
	rootStore: RootStore;
	items: CartItem[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this, {
			rootStore: false,
		});

		if (typeof window !== 'undefined') {
			this.loadFromLocalStorage();
		}
	}

	get totalItems() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}

	get totalPrice() {
		return this.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	}

	addToCart(product: Product) {
		const existingItem = this.items.find(
			(item) => item.product.id === product.id
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			this.items.push({ product, quantity: 1 });
		}

		this.saveToLocalStorage();
	}

	removeFromCart(productId: number) {
		this.items = this.items.filter((item) => item.product.id !== productId);
		this.saveToLocalStorage();
	}

	decrementItem(productId: number) {
		const existingItem = this.items.find(
			(item) => item.product.id === productId
		);

		if (existingItem) {
			if (existingItem.quantity === 1) {
				this.removeFromCart(productId);
			} else {
				existingItem.quantity -= 1;
				this.saveToLocalStorage();
			}
		}
	}

	clearCart() {
		this.items = [];
		this.saveToLocalStorage();
	}

	private saveToLocalStorage() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(this.items));
		}
	}

	private loadFromLocalStorage() {
		try {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				this.items = JSON.parse(savedCart);
			}
		} catch (error) {
			console.error('Error loading cart from localStorage:', error);
		}
	}
}
