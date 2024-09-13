import React from 'react';
import { TProduct } from 'types/product';

export default function OtherIngredients({
	otherIngredients,
}: {
	otherIngredients: TProduct['nutritionFacts']['otherIngredients'];
}) {
	return (
		<div>
			<p className='mb-4 typography-B18'>Other Ingredients</p>
			<span>{otherIngredients.map(ing => ing.name).join(', ')}</span>
		</div>
	);
}
