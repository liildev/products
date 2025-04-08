import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Registry, StoreProvider } from '@/components/providers';
import { Container } from '@/components/container';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Product Catalog',
	description: 'A mini product catalog built with Next.js and MobX',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={geistSans.variable}>
				<Registry>
					<StoreProvider>
						<Container>{children}</Container>
					</StoreProvider>
				</Registry>
			</body>
		</html>
	);
}
