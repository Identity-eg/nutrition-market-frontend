import { Button } from 'components/ui/button';
import RatingStars from './rating-stars';
import CircleProgress from './circle-progress';
import { StarIcon } from 'lucide-react';
import ReviewsList from './reviews-list';
import { Separator } from 'components/ui/separator';
import { Accordion } from 'components/ui/accordion';
import { Progress } from 'components/ui/progress';
import FacetedFilter from 'app/shop/components/filter/facetedFilter';
import { TProduct } from 'types/product';

export default function Reviews({
	averageRating,
	reviewsNumbers,
}: {
	averageRating: TProduct['averageRating'];
	reviewsNumbers: TProduct['numReviews'];
}) {
	const ratingPrecentage = (averageRating / 5) * 100;

	{
		/* {Array.from({ length: 5 }, (el, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <h3>{i + 1} star</h3>
              <div className="h-2 bg-gray-200 rounded-full w-36">
                <div
                  className={`h-full bg-yellow-500 rounded-full`}
                  style={{
                    width: `${Math.trunc(
                      (ratingObj[i + 1] / allRating.length) * 100 || 0
                    )}%`,
                  }}
                ></div>
              </div>
              <h3>
                {Math.trunc((ratingObj[i + 1] / allRating.length) * 100 || 0)}%
              </h3>
            </div>
          ))} */
	}

	// const allRating = reviews?.map((el) => el.rating);
	// const ratingObj = allRating?.reduce(
	//   (acc, el, i) => ((acc[el] = acc[el] + 1 || 1), acc),
	//   {}
	// );

	return (
		<div>
			<h3 className="mb-6 typography-M16">What Others Are Saying</h3>

			<div className="mb-8 flex gap-12 rounded-md border border-gray-40 p-4">
				<div className="flex flex-col justify-between gap-4">
					<div className="flex items-center gap-2">
						<CircleProgress
							precentage={ratingPrecentage}
							strokeWidth={4}>
							<span className="typography-SB16">{averageRating}</span>
						</CircleProgress>
						<div className="flex flex-col gap-2">
							<RatingStars averageRating={averageRating} />
							{reviewsNumbers ? (
								<p className="typography-R14">From {reviewsNumbers} reviews</p>
							) : (
								<p className="typography-R14">No reviews</p>
							)}
						</div>
					</div>
					<Button>Write a review</Button>
				</div>
				<div>
					{[5, 4, 3, 2, 1].map(el => (
						<div
							key={el}
							className="mb-2 flex items-center gap-4">
							<p className="flex items-center gap-2">
								{el}
								<StarIcon
									fill="currentColor"
									className="text-orange-400"
									size={16}
								/>
							</p>
							<Progress
								className="h-1 w-52 text-red-500"
								value={80}
							/>
							<p>4</p>
						</div>
					))}
				</div>
			</div>
			<div className="grid-cols-[1fr_3fr] gap-4 media-md:grid">
				<article className="hidden h-[500px] rounded-lg border border-gray-50 p-4 media-md:block">
					<h4 className="mb-4 capitalize typography-B16">Reviews Filter</h4>
					<Separator />

					<Accordion
						type="multiple"
						defaultValue={['rating']}
						className="w-full">
						{/* <FacetedFilter
							title="Rating"
							value="rating"
							options={['5', '4', '3', '2', '1'].map(el => ({
								label: el,
								value: el,
							}))}
						/> */}
					</Accordion>
				</article>
				<ReviewsList />
			</div>
		</div>
	);
}
