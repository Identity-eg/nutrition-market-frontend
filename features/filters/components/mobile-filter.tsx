import { Button } from 'components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import { FilterIcon } from 'lucide-react';
import { ClearAllBtn } from './clear-all-btn';
import { Suspense } from 'react';
import {
	Accordion,
	AccordionTrigger,
	AccordionItem,
	AccordionContent,
} from 'components/ui/accordion';
import { FacetedFilter } from './faceted-filter';
import { Inputs } from './price-inputs';
import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';
import { getDosageForms } from 'apis/server/dosageForm';
import { RatingStarsFacet } from './rating-stars-facet';

export async function MobileFilter() {
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
		<Sheet>
			<SheetTrigger
				asChild
				className='relative flex items-center gap-2 text-green-500 media-md:hidden'>
				<Button
					variant='secondary-gray'
					size='icon'>
					<FilterIcon className='flex-shrink-0' />
				</Button>
			</SheetTrigger>

			<SheetContent className='flex w-full flex-col'>
				<SheetHeader className='flex-row items-center justify-between border-b border-gray-40 pb-4'>
					<SheetTitle>Filters</SheetTitle>
					<ClearAllBtn />
				</SheetHeader>
				<article className='h-full overflow-y-auto overflow-x-hidden border-gray-50 media-md:hidden'>
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
									<Inputs />
								</Suspense>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</article>
				<SheetClose>
					<Button className='w-full'>See results</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}
