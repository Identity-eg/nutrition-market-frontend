import Image from 'next/image';
import Link from 'next/link';

import { TProduct } from 'types/product';

export default function ShoppingItem({
	name,
	description,
	price,
	images,
	numReviews,
	_id,
}: TProduct) {
	console.log(images[0].url);

	return (
		<div className="group flex flex-col border-r p-4">
			<div className="relative mb-2 flex flex-col overflow-hidden">
				{1 > 0 && (
					<div className="absolute z-[5] rounded-md bg-green-600 px-3 text-sm text-white">
						<p>-{20}%</p>
					</div>
				)}
				<Link
					href={`/products/${_id}`}
					className="mx-auto">
					<Image
						className="h-[230px] w-[230px] cursor-pointer object-contain transition-all duration-300 group-hover:scale-110"
						src={images[0].url}
						width={200}
						height={200}
						alt="product-img"
					/>
				</Link>
				{/* onHover Container */}
				<div className="absolute -end-10 top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 group-hover:end-0">
					<div className="group/wishlist relative">
						<div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-red-500 hover:text-white">
							{/* <AiOutlineHeart size={24} /> */}
						</div>
						<span className="pointer-events-none invisible absolute end-12 top-8 -translate-y-full whitespace-nowrap rounded-md bg-gray-500 px-2 py-1 text-sm text-white opacity-0 transition group-hover:visible group-hover/wishlist:opacity-100">
							WishList
						</span>
					</div>

					<div className="group/compare relative">
						<div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-red-500 hover:text-white">
							{/* <BiLayer size={24} /> */}
						</div>
						<span className="pointer-events-none invisible absolute end-12 top-8 -translate-y-full whitespace-nowrap rounded-md bg-gray-500 px-2 py-1 text-sm text-white opacity-0 transition group-hover:visible group-hover/compare:opacity-100">
							Compare
						</span>
					</div>
				</div>
			</div>
			{/* ---------- Title & Stars & Price ------------ */}
			<div className="my-4 flex flex-col items-center gap-2">
				<p className="text-blue-700 2xl:text-base line-clamp-2 text-center text-sm font-semibold capitalize">
					{name}
				</p>
				<div className="flex items-center gap-2">
					<div className="text-yellow-500 flex">
						{/* {[...Array(5).keys()].map((el) => {
              const lastStar = 4;
              if (lastStar === el) {
                return <AiOutlineStar key={el} className='text-gray-400' />;
              }
              return <AiOutlineStar key={el} />;
            })} */}
					</div>
					<div className="text-sm text-gray-400">
						<p>{numReviews} reviews</p>
					</div>
				</div>
				{/* <FormatNumber value={price} /> */}
			</div>
			{/* Buttons */}
			<div className="mt-auto flex flex-col gap-2">
				{/* {isExisted ? (
          <CartControls productId={_id} />
        ) : (
          <AddToCartBtn color={colors[0]._id} productId={_id} size={sizes[0]} />
        )}
        <QuickViewBtn
          colors={colors}
          description={description}
          image={images[0]}
          name={name}
          numReviews={numReviews}
          price={price}
        /> */}
			</div>
		</div>
	);
}

