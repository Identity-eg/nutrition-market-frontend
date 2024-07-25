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
import { Inputs } from './inputs';
import { TSearchParams } from 'app/shop/page';
import { getDosageForms } from 'apis/server/dosageForm';

export default async function FilterProducts({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const { companies } = await getCompanies();
	const { categories } = await getCategories();
	const { dosageForms } = await getDosageForms();

	const keys = Object.keys(searchParams);

	return (
		<article className="hidden self-start rounded-lg border border-gray-50 media-md:block">
			<div className="flex items-center justify-between border-b border-gray-50 p-4 pb-4 shadow-sm">
				<h4 className="capitalize typography-B16">filter option</h4>
				<ClearAllBtn />
			</div>

			<div className="h-[60vh] overflow-y-auto overflow-x-hidden p-4 pt-0">
				<Accordion
					defaultValue={keys}
					type="multiple"
					className="w-full [&>*:last-child]:border-0">
					<FacetedFilter
						title="Company"
						value="company"
						options={
							companies?.map(c => ({ label: c.name, value: c._id })) ?? []
						}
					/>
					<FacetedFilter
						title="Dosage form"
						value="dosageForm"
						options={
							dosageForms?.map(f => ({ label: f.name, value: f._id })) ?? []
						}
					/>

					<FacetedFilter
						title="Category"
						value="category"
						options={
							categories?.map(c => ({ label: c.name, value: c._id })) ?? []
						}
					/>

					<AccordionItem value={'price'}>
						<AccordionTrigger className="typography-M14">
							Price
						</AccordionTrigger>
						<AccordionContent className="space-y-2">
							<Inputs />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</article>
	);
}
