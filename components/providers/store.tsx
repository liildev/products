'use client';

import type React from 'react';

import { createContext } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import { ProductStore } from '../../lib/stores/product';
import { CartStore } from '../../lib/stores/cart';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

class RootStore {
	productStore: ProductStore;
	cartStore: CartStore;

	constructor() {
		this.productStore = new ProductStore(this);
		this.cartStore = new CartStore(this);
	}
}

export const StoreContext = createContext<RootStore | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const store = new RootStore();

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};
