/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},experimental: {
		missingSuspenseWithCSRBailout: false,
	  },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				// pathname: '/account123/**',
			},
		],
	},
	logging: { fetches: { fullUrl: true } },
};

export default nextConfig;
