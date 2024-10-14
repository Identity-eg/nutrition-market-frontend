import { RatingStars } from '../../[productId]/components/rating-stars';
import Image from 'next/image';
import Sale from './sale';
import Link from 'next/link';
import { TProduct } from 'types/product';
import { AddToCartButton } from './add-to-cart-btn';
import Price from './price';
import {
	PillIcon,
	PlusIcon,
	ShoppingBagIcon,
	ShoppingBasketIcon,
} from 'lucide-react';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';

const CardItem = ({ variants, averageRating, _id }: TProduct) => {
	const defaltVariant = variants[0];
	const primaryImage = defaltVariant.images?.[0];
	return (
		<div className='group relative flex flex-col border-gray-50 p-4 last:!border-r'>
			<Sale
				price={defaltVariant.price}
				priceAfterDiscount={defaltVariant.priceAfterDiscount}
			/>

			<div className='relative mb-2 flex w-full items-center justify-center self-center overflow-hidden rounded-sm'>
				<Link
					href={`/shop/${_id}`}
					className='md:w-48 md:h-48 flex aspect-square h-40 w-40 items-center justify-center'>
					<Image
						className='aspect-square w-[90%] cursor-pointer object-contain p-2 mix-blend-multiply transition duration-300 group-hover:scale-110'
						src={primaryImage.url}
						alt={primaryImage.name}
						width={150}
						height={150}
					/>
				</Link>
				<AddToCartButton
					size='sm'
					className={
						'pointer-events-none invisible absolute w-[70%] -translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100'
					}
					quantity={defaltVariant.quantity}
					productId={_id}
					variantId={defaltVariant._id}
				/>

				<div className='absolute -right-10 top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 group-hover:right-0'>
					{/* <QuickViewButton
						name={name}
						images={images}
						price={price}
						_id={_id}
						description={description}
						colors={colors}
						priceAfterDiscount={priceAfterDiscount}
						averageRating={averageRating}
						numReviews={numReviews}
						icon={true}
					/> */}

					{/* <button className="relative group/wishlist">
            <div className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
              <AiOutlineHeart size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/wishlist:opacity-100 transition pointer-events-none">
              WishList
            </span>
          </button> */}

					{/* <CompareButton
						name={name}
						images={images}
						price={price}
						_id={_id}
						description={description}
						colors={colors}
						priceAfterDiscount={priceAfterDiscount}
						averageRating={averageRating}
						numReviews={numReviews}
					/> */}
				</div>
			</div>

			<RatingStars
				averageRating={averageRating}
				className='mb-4'
				size={14}
			/>

			<Link
				className='mb-4 line-clamp-2 underline-offset-1 typography-M14 hover:underline'
				href={`/shop/${_id}`}>
				{defaltVariant.name}
			</Link>

			<div className='mt-auto'>
				<Price
					className='mb-0'
					previousPriceClassName='typography-R14 text-gray-200'
					finalPriceClassName='typography-SB18'
					price={defaltVariant.price}
					priceAfterDiscount={defaltVariant.priceAfterDiscount}
				/>
			</div>

			{/* <div className='flex gap-2'>
				{variants.map((v, i) => (
					<div
						// variant={'outline'}
						className={cn(
							'flex items-center justify-start gap-1 self-start rounded-md bg-gray-30 px-2 py-1 typography-R12',
							i === 1 && 'border border-gray-50 bg-white'
						)}>
						{v.unitCount} <PillIcon size={12} />
					</div>
				))}
			</div> */}
		</div>
	);
};

export default CardItem;
