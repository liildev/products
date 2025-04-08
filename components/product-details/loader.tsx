import styled, { keyframes } from 'styled-components';

export const Loader = () => {
	return (
		<>
			<BackButtonSkeleton />
			<ProductContainer>
				<ImageSkeleton />
				<ProductInfo>
					<TitleSkeleton />
					<PriceSkeleton />
					<DescriptionSkeleton />
					<ButtonSkeleton />
				</ProductInfo>
			</ProductContainer>
		</>
	);
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const BackButtonSkeleton = styled.div`
	height: 24px;
	width: 120px;
	margin-bottom: 20px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const ImageSkeleton = styled.div`
	height: 400px;
	border-radius: 8px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;

	@media (max-width: 768px) {
		height: 300px;
	}
`;

const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const TitleSkeleton = styled.div`
	height: 40px;
	width: 80%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const PriceSkeleton = styled.div`
	height: 30px;
	width: 40%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const DescriptionSkeleton = styled.div`
	height: 50px;
	width: 100%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;

const ButtonSkeleton = styled.div`
	height: 48px;
	width: 100%;
	margin-top: 10px;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200px 100%;
	animation: ${shimmer} 1.5s infinite linear;
	border-radius: 4px;
`;
