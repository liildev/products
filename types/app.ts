import { CartStore } from '@/lib/stores/cart';
import { ProductStore } from '@/lib/stores/product';
import { Product } from './product';

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface RootStore {
	productStore: ProductStore;
	cartStore: CartStore;
}
