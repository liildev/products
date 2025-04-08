'use client';

import type { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCart } from '../add-to-cart';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

interface ProductCardProps {
	product: Product;
}

export const Item = observer(({ product }: ProductCardProps) => {
	return (
		<Card>
			<Link
				href={`/products/${product.id}`}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<ImageContainer>
					<ProductImage
						src={product.image || '/placeholder.svg'}
						alt={product.name}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</ImageContainer>
				<ProductInfo>
					<ProductName>{product.name}</ProductName>
					<ProductPrice>${product.price.toFixed(2)}</ProductPrice>
				</ProductInfo>
			</Link>

			<ActionArea>
				<AddToCart product={product} />
			</ActionArea>
		</Card>
	);
});

const Card = styled.div`
	border-radius: 8px;
	overflow: hidden;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	background: white;
	height: 100%;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
	overflow: hidden;
`;

const ProductImage = styled(Image)`
	object-fit: cover;
	transition: transform 0.3s ease;

	${Card}:hover & {
		transform: scale(1.05);
	}
`;

const ProductInfo = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const ProductName = styled.h3`
	margin: 0 0 8px 0;
	font-size: 1.1rem;
	color: var(--text-primary);
`;

const ProductPrice = styled.p`
	margin: 0;
	font-weight: bold;
	font-size: 1.2rem;
	color: var(--primary);
`;

const ActionArea = styled.div`
	margin-top: auto;
	padding: 0 16px 16px;
`;
