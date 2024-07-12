'use client';

import { motion } from 'framer-motion';
export default function ProductCardSkeleton() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 100,
			}}
			transition={{ ease: 'easeInOut', duration: 0.5 }}
			role="status"
			className="rounded-md bg-white p-4"
		>
			<div className="h-full animate-pulse">
				<div className="flex h-full flex-col gap-5">
					<div className="image h-[200px] w-full rounded bg-gray-200" />
					<div className="flex flex-col gap-2">
						<div className="title h-[10px] w-full rounded bg-gray-200" />
						<div className="title h-[10px] w-1/3 rounded bg-gray-200" />
					</div>
					<div className="price h-[30px] w-1/2 rounded bg-gray-200" />
					<div className="button mb-auto h-[40px] w-full rounded bg-gray-200" />
				</div>
			</div>
		</motion.div>
	);
}
