import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import FacetedFilter from './faceted-filter';

import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';
import { ClearAllBtn } from './clear-all-btn';
import { Inputs } from './price-inputs';
import { getDosageForms } from 'apis/server/dosageForm';

export default async function FilterProducts() {
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
	} as const;

	return (
		<article className='sticky left-0 top-6 hidden self-start rounded-lg border border-gray-50 media-md:block'>
			<div className='flex items-center justify-between border-b border-gray-50 p-4 pb-4 shadow-sm'>
				<h4 className='capitalize typography-B16'>filter option</h4>
				<ClearAllBtn />
			</div>

			<div className='h-[60vh] overflow-y-auto overflow-x-hidden p-4 pt-0'>
				<Accordion
					defaultValue={Object.keys(FilterKeys)}
					type='multiple'
					className='w-full [&>*:last-child]:border-0'>
					<FacetedFilter
						title='Company'
						value={FilterKeys.company}
						options={
							companies?.companies.map(c => ({
								label: c.name,
								value: c._id,
							})) ?? []
						}
					/>
					<FacetedFilter
						title='Dosage form'
						value={FilterKeys.dosageForm}
						options={
							dosageForms?.dosageForms.map(f => ({
								label: f.name,
								value: f._id,
							})) ?? []
						}
					/>

					<FacetedFilter
						title='Category'
						value={FilterKeys.category}
						options={
							categories?.categories.map(c => ({
								label: c.name,
								value: c._id,
							})) ?? []
						}
					/>

					<AccordionItem value={FilterKeys.price}>
						<AccordionTrigger className='typography-M14'>
							Price
						</AccordionTrigger>
						<AccordionContent className='space-y-2'>
							<Inputs />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</article>
	);
}
