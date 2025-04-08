'use client';

import type { Product } from '@/types/product';
import { useStore } from '@/lib/hooks/store';
import { observer } from 'mobx-react-lite';
import { Button } from './button';

interface AddToCartButtonProps {
	product: Product;
}

export const AddToCart = observer(({ product }: AddToCartButtonProps) => {
	const { cartStore } = useStore();

	const handleAddToCart = () => {
		cartStore.addToCart(product);
	};

	const selectedProduct = cartStore.items.find(
		(item) => item.product.id === product.id
	);

	return (
		<Button onClick={handleAddToCart} disabled={!!selectedProduct}>
			{selectedProduct ? (
				'Selected'
			) : (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width={24}
						height={24}
						viewBox='0 0 24 24'
					>
						<path
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 5v14m-7-7h14'
						/>
					</svg>
					Add to Cart
				</>
			)}
		</Button>
	);
});
