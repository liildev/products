'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/hooks/store';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

export const SearchBar = observer(() => {
	const { productStore } = useStore();
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			productStore.setSearchTerm(searchTerm);
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, productStore]);

	const handleClear = () => {
		setSearchTerm('');
		productStore.setSearchTerm('');
	};

	return (
		<SearchContainer>
			<SearchInput
				type='text'
				placeholder='Search products...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{searchTerm ? (
				<ClearButton onClick={handleClear}>×</ClearButton>
			) : (
				<SearchIcon>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						viewBox='0 0 16 16'
					>
						<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
					</svg>
				</SearchIcon>
			)}
		</SearchContainer>
	);
});

const SearchContainer = styled.div`
	position: relative;
	width: 300px;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 10px 40px 10px 15px;
	border: 1px solid var(--border);
	border-radius: 4px;
	font-size: 1rem;
	outline: none;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: var(--primary);
	}
`;

const SearchIcon = styled.div`
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
	color: var(--secondary);
`;

const ClearButton = styled.button`
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: var(--secondary);
	cursor: pointer;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		color: var(--primary);
	}
`;
