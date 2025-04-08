'use client';

import { makeAutoObservable, runInAction } from 'mobx';
import type { Product } from '@/types/product';
import type { RootStore } from '@/types/app';
import { mockProducts } from '@/lib/mock';

export class ProductStore {
	rootStore: RootStore;
	products: Product[] = [];
	displayedProducts: Product[] = [];
	isLoading = false;
	hasInitialized = false;
	searchTerm = '';
	itemsPerPage = 3;
	currentPage = 1;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this, {
			rootStore: false,
		});
	}

	get filteredProducts() {
		if (!this.searchTerm) return this.products;

		const searchTermLower = this.searchTerm.toLowerCase();
		return this.products.filter((product) =>
			product.name.toLowerCase().includes(searchTermLower)
		);
	}

	get hasMoreProducts() {
		return this.displayedProducts.length < this.filteredProducts.length;
	}

	async loadProducts() {
		this.isLoading = true;

		try {
			await new Promise((resolve) => setTimeout(resolve, 500));

			runInAction(() => {
				this.products = mockProducts;
				this.displayedProducts = this.filteredProducts.slice(
					0,
					this.itemsPerPage
				);
				this.hasInitialized = true;
				this.isLoading = false;
			});
		} catch (error) {
			console.error('Error loading products:', error);
			runInAction(() => {
				this.isLoading = false;
			});
		}
	}

	loadMoreProducts() {
		if (!this.hasMoreProducts) return;

		this.isLoading = true;

		setTimeout(() => {
			runInAction(() => {
				const nextPage = this.currentPage + 1;
				const startIndex = 0;
				const endIndex = nextPage * this.itemsPerPage;

				this.displayedProducts = this.filteredProducts.slice(
					startIndex,
					endIndex
				);
				this.currentPage = nextPage;
				this.isLoading = false;
			});
		}, 500);
	}

	setSearchTerm(term: string) {
		this.searchTerm = term;
		this.currentPage = 1;
		this.displayedProducts = this.filteredProducts.slice(0, this.itemsPerPage);
	}

	async getProductById(id: number): Promise<Product | undefined> {
		if (this.products.length > 0) {
			return this.products.find((p) => p.id === id);
		}

		await this.loadProducts();
		return this.products.find((p) => p.id === id);
	}
}
