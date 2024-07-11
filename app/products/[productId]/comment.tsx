import {
	CheckCircle,
	CircleCheck,
	CircleX,
	Pencil,
	Trash2,
} from 'lucide-react';
import React from 'react';
import RatingStars from './rating-stars';
import { Button } from 'components/ui/button';

export default function Comment() {
	return (
		<li
			className={`flex items-start gap-2 px-4 pb-4 ${
				false ? 'opacity-50' : ''
			}`}>
			<div className="w-full">
				<div className="flex justify-between">
					<h1 className="capitalize text-gray-800 typography-B16">title</h1>
					<p className="flex items-center gap-2 text-sm text-gray-100">
						<CheckCircle
							size={16}
							color="green"
						/>
						Verified reviewer
					</p>
				</div>
				<div className="text-yellow-500 mb-1 flex">
					<RatingStars averageRating={5} />
				</div>
				<p className="mb-3 text-gray-400 typography-R14">
					July 2, 2020 03:29 PM
				</p>
				<p className="mb-6 flex-wrap typography-R16">This is a good product</p>
				<div className="flex flex-col justify-between gap-4 media-md:flex-row media-md:items-center">
					<p className="flex items-center gap-2 text-gray-200 typography-R14">
						{true ? (
							<>
								<CircleCheck size={16} /> Yes, I recommend this product
							</>
						) : (
							<>
								<CircleX />
								No, I don`t recommend this product
							</>
						)}
					</p>

					{true && (
						<div className="flex gap-2">
							<Button
								variant="secondary-white"
								className="text-red-300 hover:bg-red-30"
								// onClick={() => {
								// 	deleteReview(_id);
								// 	// startTransition(() => revalidateAction(productId));
								// }}
							>
								<Trash2
									size={16}
									className="mr-2"
								/>
								Delete
							</Button>
							<Button
								variant="secondary-gray"

								// onClick={() => {
								// 	dispatch(enableEditing());
								// }}
							>
								<Pencil
									size={16}
									className="mr-2"
								/>
								Edit
							</Button>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}

