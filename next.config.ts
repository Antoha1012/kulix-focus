import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Performance optimizations
	experimental: {
		optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
	},

	// Image optimization
	images: {
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 31536000, // 1 year
	},

	// Compression
	compress: true,

	// Bundle analyzer (uncomment to analyze bundle)
	// webpack: (config, { isServer }) => {
	// 	if (!isServer) {
	// 		config.resolve.fallback = {
	// 			...config.resolve.fallback,
	// 			fs: false,
	// 		};
	// 	}
	// 	return config;
	// },

	// Headers for better caching
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
				],
			},
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=300, s-maxage=300",
					},
				],
			},
		];
	},
};

export default nextConfig;
