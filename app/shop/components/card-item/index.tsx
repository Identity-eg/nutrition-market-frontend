import { RatingStars } from '../../[productId]/components/rating-stars';
import Image from 'next/image';
import Sale from './sale';
import Link from 'next/link';
import { TProduct } from 'types/product';
import AddToCartButton from './add-to-cart-btn';
import Price from './price';

const CardItem = ({ variants, averageRating, _id }: TProduct) => {
	const defaltVariant = variants[0];
	const primaryImage = defaltVariant.images?.[0];
	return (
		<div className='relative flex flex-col p-6 bg-white border rounded-md group border-gray-50 media-md:p-4'>
			<Sale
				price={defaltVariant.price}
				priceAfterDiscount={defaltVariant.priceAfterDiscount}
			/>

			<div className='relative flex items-center self-center justify-center w-full mb-2 overflow-hidden rounded-sm bg-gray-20'>
				<Link
					href={`/shop/${_id}`}
					className='flex items-center justify-center w-40 h-40 md:w-48 md:h-48 aspect-square'>
					<Image
						className='object-contain w-4/5 p-2 transition duration-300 cursor-pointer aspect-square mix-blend-multiply group-hover:scale-110'
						src={primaryImage.url}
						alt={primaryImage.name}
						width={300}
						height={300}
					/>
				</Link>

				<div className='absolute top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 -right-10 group-hover:right-0'>
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

			<div className='flex flex-col gap-2 mb-2'>
				<Link
					className='font-semibold text-blue-700 capitalize line-clamp-2'
					href={`/shop/${_id}`}>
					{defaltVariant.name}
				</Link>

				<RatingStars averageRating={averageRating} />
			</div>

			<Price
				price={defaltVariant.price}
				priceAfterDiscount={defaltVariant.priceAfterDiscount}
			/>

			{/* <div className='w-full mt-auto'> */}
				<AddToCartButton
					productId={_id}
					variantId={defaltVariant._id}
				/>
			{/* </div> */}
		</div>
	);
};

export default CardItem;
