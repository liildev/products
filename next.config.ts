import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		minimumCacheTTL: 86400,
		deviceSizes: [320, 420, 768, 1024, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
