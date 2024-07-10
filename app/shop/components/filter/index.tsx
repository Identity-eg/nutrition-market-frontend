import { Accordion } from 'components/ui/accordion';
import { Separator } from 'components/ui/separator';
import FacetedFilter from './facetedFilter';

import { DOSAGE_FORMS } from 'constants/index';
import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';

export default async function FilterProducts() {
	const { companies } = await getCompanies();
	const { categories } = await getCategories();

	return (
		<article className="hidden rounded-lg border border-gray-50 p-4 media-md:block">
			<h4 className="mb-4 capitalize typography-B16">filter option</h4>
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
					value="dosageForm"
					options={DOSAGE_FORMS.map(f => ({ label: f, value: f }))}
				/>

				<FacetedFilter
					title="Category"
					value="category"
					options={
						categories?.map(c => ({ label: c.name, value: c._id })) ?? []
					}
				/>
			</Accordion>
		</article>
	);
}
