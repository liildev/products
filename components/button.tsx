import styled from 'styled-components';

export const Button = styled.button`
	background-color: var(--primary);
	color: white;
	border: none;
	border-radius: 4px;
	padding: 8px 16px;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.3s ease;
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	&:hover {
		background-color: var(--primary-hover);
	}

	&:disabled {
		background-color: #bbb;
		cursor: not-allowed;
	}
`;
