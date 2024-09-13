'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TProduct } from 'types/product';

export default function ProductImages({
	images,
}: {
	images: Pick<TProduct, 'variants'>['variants'][number]['images'];
}) {
	const primaryImage = images[0];

	const [displayedPhotoUrl, setDisplayedPhotoUrl] = useState<string>(
		primaryImage.url
	);

	useEffect(() => {
		setDisplayedPhotoUrl(primaryImage.url);
	}, [primaryImage.url]);

	return (
		<div className='flex flex-col gap-4 border-b border-gray-50 pb-8'>
			<div className='aspect-square w-full max-w-[500px] content-center self-center'>
				<Image
					width={1000}
					height={1000}
					className='h-full w-full object-contain pt-4'
					alt='Product image'
					src={displayedPhotoUrl}
				/>
			</div>
			<div className='flex w-full gap-2 self-start'>
				{images?.map(image => (
					<div
						key={image.name}
						className={`size-[90px] cursor-pointer overflow-hidden rounded-md border p-2 ${
							image.url === displayedPhotoUrl
								? 'border-green-400'
								: 'border-gray-50'
						}`}
						onClick={() => {
							setDisplayedPhotoUrl(image.url);
						}}>
						<Image
							width={200}
							height={200}
							className='h-full w-full object-contain'
							src={image.url}
							alt=''
						/>
					</div>
				))}
			</div>
		</div>
	);
}
