'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/lib/hooks/store';
import { Button } from '../button';
import { Item } from './item';
import { Loader } from './loader';
import styled from 'styled-components';

export const ProductList = observer(() => {
	const { productStore } = useStore();

	useEffect(() => {
		productStore.loadProducts();
	}, [productStore]);

	if (productStore.isLoading && productStore.displayedProducts.length === 0) {
		return (
			<Grid>
				<Loader />
			</Grid>
		);
	}

	if (
		productStore.hasInitialized &&
		productStore.filteredProducts.length === 0
	) {
		return (
			<EmptyState>No products found. Try adjusting your search.</EmptyState>
		);
	}

	return (
		<>
			<Grid>
				{productStore.displayedProducts.map((product) => (
					<Item key={product.id} product={product} />
				))}
			</Grid>

			{productStore.hasMoreProducts && (
				<ButtonContainer>
					<Button
						onClick={() => productStore.loadMoreProducts()}
						disabled={productStore.isLoading}
					>
						{productStore.isLoading ? 'Loading...' : 'Show More'}
					</Button>
				</ButtonContainer>
			)}
		</>
	);
});

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 30px;
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 40px;
	color: var(--text-secondary);
`;

const ButtonContainer = styled.div`
	margin: 40px auto;
	max-width: 200px;
`;
