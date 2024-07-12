import { Button } from 'components/ui/button';
import RatingStars from './rating-stars';
import CircleProgress from './circle-progress';
import { StarIcon } from 'lucide-react';
import ReviewsList from './reviews-list';
import { Separator } from 'components/ui/separator';
import { Accordion } from 'components/ui/accordion';
import { Progress } from 'components/ui/progress';
import FacetedFilter from 'app/shop/components/filter/facetedFilter';

export default function Reviews() {
	return (
		<div>
			<h3 className="mb-6 typography-M16">What Others Are Saying</h3>

			<div className="mb-8 flex gap-12 rounded-md border border-gray-40 p-4">
				<div className="flex flex-col justify-between gap-4">
					<div className="flex items-center gap-2">
						<CircleProgress
							precentage={80}
							strokeWidth={4}
						>
							<span className="typography-SB16">4.8</span>
						</CircleProgress>
						<div className="flex flex-col gap-2">
							<RatingStars averageRating={4} />
							<p className="typography-R14">From 1,25k reviews</p>
						</div>
					</div>
					<Button>Write a review</Button>
				</div>
				<div>
					{[5, 4, 3, 2, 1].map(el => (
						<div
							key={el}
							className="mb-2 flex items-center gap-4"
						>
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
			<div className="grid grid-cols-[1fr_3fr] gap-4">
				<article className="hidden h-[500px] rounded-lg border border-gray-50 p-4 media-md:block">
					<h4 className="mb-4 capitalize typography-B16">Reviews Filter</h4>
					<Separator />

					<Accordion
						type="multiple"
						defaultValue={['rating']}
						className="w-full"
					>
						<FacetedFilter
							title="Rating"
							value="rating"
							options={['5', '4', '3', '2', '1'].map(el => ({
								label: el,
								value: el,
							}))}
						/>
					</Accordion>
				</article>
				<ReviewsList />
			</div>
		</div>
	);
}
