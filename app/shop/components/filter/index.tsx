import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { Separator } from 'components/ui/separator';
import FacetedFilter from './facetedFilter';

import { DOSAGE_FORMS } from 'constants/index';
import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';
import { ClearAllBtn } from './clear-all-btn';
import { Inputs } from './inputs';

export default async function FilterProducts() {
	const { companies } = await getCompanies();
	const { categories } = await getCategories();

	return (
		<article className="hidden rounded-lg border border-gray-50 p-4 media-md:block">
			<div className="mb-4 flex items-center justify-between">
				<h4 className="capitalize typography-B16">filter option</h4>
				<ClearAllBtn />
			</div>

			<Separator />

			<Accordion
				type="multiple"
				className="w-full">
				<FacetedFilter
					title="Company"
					value="company"
					options={companies?.map(c => ({ label: c.name, value: c._id })) ?? []}
				/>
				<FacetedFilter
					title="Dosage form"
					value="itemForm"
					options={DOSAGE_FORMS.map(f => ({ label: f, value: f }))}
				/>

				<FacetedFilter
					title="Category"
					value="category"
					options={
						categories?.map(c => ({ label: c.name, value: c._id })) ?? []
					}
				/>

				<AccordionItem value={'price'}>
					<AccordionTrigger className="typography-M14">Price</AccordionTrigger>
					<AccordionContent className="space-y-2">
						<Inputs />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}
