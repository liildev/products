'use client';

import { useRef, useEffect } from 'react';
import { useStore } from '@/lib/hooks/store';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

interface CartDropdownProps {
	onClose: () => void;
}

export const Dropdown = observer(({ onClose }: CartDropdownProps) => {
	const { cartStore } = useStore();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<DropdownContainer ref={dropdownRef}>
			<CartHeader>
				<CartTitle>Your Cart</CartTitle>
				<CloseButton onClick={onClose}>×</CloseButton>
			</CartHeader>

			<CartItems>
				{cartStore.items.length === 0 ? (
					<EmptyCart>Your cart is empty</EmptyCart>
				) : (
					cartStore.items.map((item) => (
						<CartItem key={item.product.id}>
							<ItemImage>
								<Image
									src={item.product.image || '/placeholder.svg'}
									alt={item.product.name}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</ItemImage>

							<ItemInfo>
								<ItemName>
									<Link href={`/products/${item.product.id}`} onClick={onClose}>
										{item.product.name}
									</Link>
								</ItemName>
								<ItemPrice>${item.product.price.toFixed(2)}</ItemPrice>
							</ItemInfo>

							<ItemQuantity>
								<QuantityButton
									onClick={() => cartStore.decrementItem(item.product.id)}
								>
									-
								</QuantityButton>
								<span>{item.quantity}</span>
								<QuantityButton
									onClick={() => cartStore.addToCart(item.product)}
								>
									+
								</QuantityButton>
							</ItemQuantity>
						</CartItem>
					))
				)}
			</CartItems>

			{cartStore.items.length > 0 && (
				<CartFooter>
					<TotalRow>
						<span>Total:</span>
						<span>${cartStore.totalPrice.toFixed(2)}</span>
					</TotalRow>
					<CheckoutButton>Checkout</CheckoutButton>
				</CartFooter>
			)}
		</DropdownContainer>
	);
});

const DropdownContainer = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	width: 320px;
	background: white;
	border-radius: 8px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	z-index: 100;
	overflow: hidden;

	@media (max-width: 480px) {
		width: 280px;
		right: -70px;
	}
`;

const CartHeader = styled.div`
	padding: 15px;
	border-bottom: 1px solid var(--border);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CartTitle = styled.h3`
	margin: 0;
	font-size: 1.1rem;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.2rem;
	color: var(--text-secondary);

	&:hover {
		color: var(--text-primary);
	}
`;

const CartItems = styled.div`
	max-height: 300px;
	overflow-y: auto;
`;

const EmptyCart = styled.div`
	padding: 30px 15px;
	text-align: center;
	color: var(--text-secondary);
`;

const CartItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr auto;
	gap: 10px;
	padding: 15px;
	border-bottom: 1px solid var(--border);
	align-items: center;
`;

const ItemImage = styled.div`
	position: relative;
	width: 60px;
	height: 60px;
	border-radius: 4px;
	overflow: hidden;
`;

const ItemInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const ItemName = styled.div`
	font-weight: 500;
	margin-bottom: 5px;
`;

const ItemPrice = styled.div`
	color: var(--primary);
	font-weight: 500;
`;

const ItemQuantity = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const QuantityButton = styled.button`
	background: none;
	border: 1px solid var(--border);
	width: 24px;
	height: 24px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		background-color: #f5f5f5;
	}
`;

const CartFooter = styled.div`
	padding: 15px;
	border-top: 1px solid var(--border);
`;

const TotalRow = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	margin-bottom: 15px;
`;

const CheckoutButton = styled.button`
	width: 100%;
	background-color: var(--primary);
	color: white;
	border: none;
	border-radius: 4px;
	padding: 10px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: var(--primary-hover);
	}
`;
