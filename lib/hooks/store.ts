import { StoreContext } from '@/components/providers';
import { useContext } from 'react';

export const useStore = () => {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error('useStore must be used within StoreProvider');
	}
	return context;
};
