import { Button, buttonVariants } from 'components/ui/button';
import RatingStars from './rating-stars';
import CircleProgress from './circle-progress';
import ReviewsList from './reviews-list';
import { Progress } from 'components/ui/progress';
import { TProduct } from 'types/product';
import { getReviews } from 'apis/server/reviews';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import ReviewForm from './review-form';
import { getCredential } from 'apis/helpers';

export default async function Reviews({
	productId,
	averageRating,
}: {
	productId: TProduct['_id'];
	averageRating: TProduct['averageRating'];
}) {
	const ratingPrecentage = (averageRating / 5) * 100;

	const { reviews, count } = await getReviews({ productId });
	const credential = await getCredential();

	const allRating = reviews?.map(el => el.rating);
	const ratingObj = allRating?.reduce(
		(acc, el, i) => ((acc[el] = acc[el] + 1 || 1), acc),
		{}
	);

	return (
		<div>
			<h3 className='mb-6 typography-M16'>What Others Are Saying</h3>

			<div className='grid-cols-[1fr_2fr] gap-4 media-md:grid'>
				<article className='hidden p-4 border rounded-lg border-gray-50 media-md:block'>
					<div className='flex flex-col justify-between gap-4 mb-6'>
						<div className='flex items-center gap-2'>
							<CircleProgress
								circleSize={72}
								precentage={ratingPrecentage}
								strokeWidth={4}>
								<span className='typography-SB16'>
									{averageRating.toFixed(1)}
								</span>
							</CircleProgress>
							<div className='flex flex-col gap-2'>
								<RatingStars averageRating={averageRating} />
								{count ? (
									<p className='typography-R14'>From {count} reviews</p>
								) : (
									<p className='typography-R14'>No reviews</p>
								)}
							</div>
						</div>
					</div>

					<div className='mb-8 w-[80%] border-b border-gray-40 pb-8'>
						{[5, 4, 3, 2, 1].map((el, i) => (
							<div
								key={el}
								className='flex items-center gap-4 mb-2'>
								<p className='flex items-center gap-2'>
									{el}
									<StarIcon
										fill='currentColor'
										className='text-orange-400'
										size={16}
									/>
								</p>
								<Progress
									className='h-1 text-red-500 w-52'
									value={ratingObj[el] * 100 || 0}
								/>
								<p>{ratingObj[el] || 0}</p>
							</div>
						))}
					</div>

					<p className='mb-8 typography-SB18'>
						Review this product <br />
						<span className='text-gray-200 typography-R14'>
							Share your thoughts with other customers
						</span>
					</p>

					{credential ? (
						<ReviewForm productId={productId} />
					) : (
						<Button
							asChild
							className='w-full capitalize'>
							<Link href={`/login?from=shop/${productId}`}>Write a review</Link>
						</Button>
					)}
				</article>

				<ReviewsList productId={productId} />
			</div>
		</div>
	);
}
