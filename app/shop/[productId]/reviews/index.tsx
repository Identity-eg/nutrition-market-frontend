import { RatingStars } from '../components/rating-stars';
import CircleProgress from './components/circle-progress';
import ReviewsList from './list';
import { Progress } from 'components/ui/progress';
import { TProduct } from 'types/product';
import { getReviews } from 'apis/server/reviews';
import { StarIcon } from 'lucide-react';
import ReviewForm from './form';
import { getMe } from 'apis/server/user';

export default async function Reviews({
	productId,
	averageRating,
}: {
	productId: TProduct['_id'];
	averageRating: TProduct['averageRating'];
}) {
	const ratingPrecentage = (averageRating / 5) * 100;

	const { reviews, count } = await getReviews({ productId });
	const user = await getMe();

	const allRating = reviews?.map(el => el.rating);
	const ratingObj = allRating?.reduce(
		(acc, el) => ((acc[el] = acc[el] + 1 || 1), acc),
		{}
	);

	const hasUserReview = reviews.some(review => review.user._id === user?._id);

	return (
		<section>
			<h3 className='mb-6 typography-M16'>What Others Are Saying</h3>

			<div className='grid-cols-[1fr_2fr] gap-4 media-md:grid'>
				<article className='hidden gap-y-6 self-start rounded-lg border border-gray-50 p-4 media-md:flex media-md:flex-col'>
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

					<div className='w-[80%]'>
						{[5, 4, 3, 2, 1].map((el, i) => (
							<div
								key={el}
								className='mb-2 flex items-center gap-4'>
								<p className='flex items-center gap-2'>
									{el}
									<StarIcon
										fill='currentColor'
										className='text-orange-400'
										size={16}
									/>
								</p>
								<Progress
									className='h-1 w-52 text-red-500'
									value={ratingObj[el] * 100 || 0}
								/>
								<p>{ratingObj[el] || 0}</p>
							</div>
						))}
					</div>

					<ReviewForm
						hasUserReview={hasUserReview}
						user={user}
						productId={productId}
					/>
				</article>

				<ReviewsList productId={productId} />
			</div>
		</section>
	);
}
