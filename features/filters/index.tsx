import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';

import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';
import { getDosageForms } from 'apis/server/dosageForm';

import { ClearAllBtn } from 'features/filters/components/clear-all-btn';
import { InputsFacet } from 'features/filters/components/price-inputs-facet';
import { FacetedFilter } from 'features/filters/components/faceted-filter';
import { Suspense } from 'react';
import { RatingStarsFacet } from './components/rating-stars-facet';

export async function Filters() {
	const [companies, categories, dosageForms] = await Promise.all([
		getCompanies(),
		getCategories(),
		getDosageForms(),
	]);

	const FilterKeys = {
		company: 'company',
		dosageForm: 'dosageForm',
		category: 'category',
		price: 'price',
		averageRating: 'averageRating',
	} as const;

	return (
		<article className='sticky left-0 top-6 hidden self-start rounded-lg border border-gray-50 media-md:block'>
			<div className='flex items-center justify-between border-b border-gray-50 p-4 pb-4 shadow-sm'>
				<h4 className='capitalize typography-B16'>filter option</h4>
				<Suspense fallback='Loading..'>
					<ClearAllBtn />
				</Suspense>
			</div>

			<div className='h-[60vh] overflow-y-auto overflow-x-hidden p-4 pt-0'>
				<Accordion
					defaultValue={Object.keys(FilterKeys)}
					type='multiple'
					className='w-full [&>*:last-child]:border-0'>
					<Suspense>
						<FacetedFilter
							title='Company'
							value={FilterKeys.company}
							options={
								companies?.companies.map(c => ({
									label: c.name,
									value: c.slug,
								})) ?? []
							}
						/>
						<FacetedFilter
							title='Dosage form'
							value={FilterKeys.dosageForm}
							options={
								dosageForms?.dosageForms.map(f => ({
									label: f.name,
									value: f.slug,
								})) ?? []
							}
						/>

						<FacetedFilter
							title='Category'
							value={FilterKeys.category}
							options={
								categories?.categories.map(c => ({
									label: c.name,
									value: c.slug,
								})) ?? []
							}
						/>
					</Suspense>

					<AccordionItem value={FilterKeys.averageRating}>
						<AccordionTrigger className='typography-M14'>
							Ratings
						</AccordionTrigger>
						<AccordionContent className='space-y-2'>
							<Suspense>
								<RatingStarsFacet />
							</Suspense>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={FilterKeys.price}>
						<AccordionTrigger className='typography-M14'>
							Price
						</AccordionTrigger>
						<AccordionContent className='space-y-2'>
							<Suspense>
								<InputsFacet />
							</Suspense>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</article>
	);
}
