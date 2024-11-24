import type { TProduct } from 'features/products/types/product';

export function OtherIngredients({
	otherIngredients,
}: {
	otherIngredients: TProduct['nutritionFacts']['otherIngredients'];
}) {
	return (
		<p className='flex-shrink-0 typography-B13'>
			Other Ingredients:{' '}
			<span className='typography-R13'>
				{otherIngredients.map(ing => ing.name).join(', ')}
			</span>
		</p>
	);
}
