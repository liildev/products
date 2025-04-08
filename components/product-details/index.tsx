'use client';

import type { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/hooks/store';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCart } from '@/components/add-to-cart';
import { Loader } from './loader';
import styled from 'styled-components';

export const ProductDetails = observer(({ id }: { id: string }) => {
	const router = useRouter();
	const { productStore } = useStore();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await productStore.getProductById(
					Number.parseInt(id)
				);
				if (productData) {
					setProduct(productData);
				}
			} catch (error) {
				console.error('Error fetching product:', error);
				router.push('/products');
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id, productStore, router]);

	if (loading) {
		return <Loader />;
	}

	if (!product) {
		return <>Product not found</>;
	}

	return (
		<>
			<BackButton as={Link} href='/products'>
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
						d='m15 6l-6 6l6 6'
					/>
				</svg>
				Back to Products
			</BackButton>

			<ProductContainer>
				<ImageContainer>
					<Image
						src={product.image}
						alt={product.name}
						fill
						style={{ objectFit: 'cover' }}
						priority
					/>
				</ImageContainer>

				<ProductInfo>
					<ProductName>{product.name}</ProductName>
					<ProductPrice>${product.price.toFixed(2)}</ProductPrice>
					<ProductDescription>
						{product.description ||
							'No description available for this product.'}
					</ProductDescription>

					<AddToCart product={product} />
				</ProductInfo>
			</ProductContainer>
		</>
	);
});

const BackButton = styled.button`
	background: none;
	border: none;
	color: var(--primary);
	font-size: 1rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 20px;
	padding: 0;

	&:hover {
		text-decoration: underline;
	}
`;

const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	height: 400px;
	border-radius: 8px;
	overflow: hidden;

	@media (max-width: 768px) {
		height: 300px;
	}
`;

const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const ProductName = styled.h1`
	font-size: 2rem;
	margin: 0;
`;

const ProductPrice = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: var(--primary);
`;

const ProductDescription = styled.p`
	font-size: 1rem;
	line-height: 1.6;
	color: var(--secondary);
`;
