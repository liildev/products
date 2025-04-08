'use client';

import styled, { keyframes } from 'styled-components';

const LoaderContainer = styled.div<{ $isVisible: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	z-index: 9999;
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};
	transition: opacity 0.3s ease;
	pointer-events: none;
`;

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const LoadingBar = styled.div`
	height: 100%;
	width: 100%;
	background: linear-gradient(
		to right,
		transparent,
		var(--primary),
		transparent
	);
	animation: ${loadingAnimation} 1.5s infinite ease-in-out;
`;

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<LoaderContainer $isVisible={isLoading}>
			<LoadingBar />
		</LoaderContainer>
	);
};
