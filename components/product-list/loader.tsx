import styled, { keyframes } from 'styled-components';

export const Loader = () => {
	return Array.from({ length: 6 }).map((_, index) => (
		<SkeletonCard key={index}>
			<SkeletonImage />
			<SkeletonInfo>
				<SkeletonTitle />
				<SkeletonPrice />
				<SkeletonButton />
			</SkeletonInfo>
		</SkeletonCard>
	));
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const SkeletonCard = styled.div`
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	background: white;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const SkeletonImage = styled.div`
	width: 100%;
	height: 200px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonInfo = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const SkeletonTitle = styled.div`
	height: 24px;
	width: 80%;
	margin-bottom: 8px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const SkeletonPrice = styled.div`
	height: 20px;
	width: 40%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const SkeletonButton = styled.div`
	height: 48px;
	width: 100%;
	margin-top: 16px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;
