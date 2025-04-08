'use client';

import { SearchBar } from '@/components/search-bar';
import { ShoppingCart } from '@/components/shopping-cart';
import { ProductList } from '@/components/product-list';
import styled from 'styled-components';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	flex-wrap: wrap;
	gap: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

const Title = styled.h1`
	font-size: 2rem;
	color: var(--text-primary);
	margin: 0;
`;

const ActionContainer = styled.div`
	display: flex;
	gap: 15px;
	align-items: center;
`;

export default function ProductsPage() {
	return (
		<>
			<Header>
				<Title>Product Catalog</Title>
				<ActionContainer>
					<SearchBar />
					<ShoppingCart />
				</ActionContainer>
			</Header>
			<ProductList />
		</>
	);
}
