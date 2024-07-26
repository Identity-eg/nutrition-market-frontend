'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { TProduct } from 'types/product';

export default function ProductImages({
	images,
}: {
	images: Pick<TProduct, 'images'>['images'];
}) {
	const primaryImage = images[0];
	const [displayedPhotoUrl, setDisplayedPhotoUrl] = useState<string>(
		primaryImage.url
	);

	return (
		<div className="flex h-[500px] flex-col">
			<div className="h-full content-center self-center">
				<Image
					width={220}
					height={220}
					alt="Product image"
					src={displayedPhotoUrl}
				/>
			</div>
			<div className="flex w-full gap-2 self-start border-b border-gray-50 pb-8">
				{images?.map(image => (
					<div
						key={image.name}
						className={`h-[70px] w-[70px] cursor-pointer overflow-hidden rounded-md border p-2 ${
							image.url === displayedPhotoUrl
								? 'border-green-400'
								: 'border-gray-50'
						}`}
						onClick={() => {
							setDisplayedPhotoUrl(image.url);
						}}>
						<Image
							width={100}
							height={100}
							className="h-full w-full object-contain"
							src={image.url}
							alt=""
						/>
					</div>
				))}
			</div>
		</div>
	);
}
