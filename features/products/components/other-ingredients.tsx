import type { TProduct } from 'features/products/types/product';

export function OtherIngredients({
	otherIngredients,
}: {
	otherIngredients: TProduct['nutritionFacts']['otherIngredients'];
}) {
	return (
		<div>
			<p className='mb-4 typography-B16'>Other Ingredients</p>
			<span className='typography-R14'>
				{otherIngredients.map(ing => ing.name).join(', ')}
			</span>
		</div>
	);
}
