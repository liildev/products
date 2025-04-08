import type { Metadata } from 'next';
import { ProductDetails } from '@/components/product-details';
import { mockProducts } from '@/lib/mock';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = Number((await params).id);
	const product = mockProducts.find((p) => p.id === id);

	if (!product) {
		return {
			title: 'Product Not Found',
			description: 'Sorry, we couldn’t find this product.',
		};
	}

	return {
		title: product.name,
		description: product.description || 'Product details and specifications',
		openGraph: {
			title: product.name,
			description: product.description || 'Check out this product',
			images: [
				{
					url: product.image || '/default.jpg',
					alt: product.name,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: product.name,
			description: product.description || 'Product details',
			images: [product.image || '/default.jpg'],
		},
	};
}

const ProductDetailPage = async ({ params }: Props) => {
	const id = (await params).id;

	return <ProductDetails id={id} />;
};

export default ProductDetailPage;
