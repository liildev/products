'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/hooks/store';
import { observer } from 'mobx-react-lite';
import { Dropdown } from './dropdown';
import styled from 'styled-components';

export const ShoppingCart = observer(() => {
	const { cartStore } = useStore();
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleCart = () => {
		setIsOpen(!isOpen);
	};

	return (
		<CartContainer>
			<CartButton onClick={toggleCart}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					fill='currentColor'
					viewBox='0 0 16 16'
				>
					<path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
				</svg>

				{mounted && cartStore.totalItems > 0 && (
					<CartCount>{cartStore.totalItems}</CartCount>
				)}
			</CartButton>

			{isOpen && <Dropdown onClose={() => setIsOpen(false)} />}
		</CartContainer>
	);
});

const CartContainer = styled.div`
	position: relative;
`;

const CartButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	padding: 8px;
`;

const CartCount = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	background-color: var(--primary);
	color: white;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.75rem;
	font-weight: bold;
`;
