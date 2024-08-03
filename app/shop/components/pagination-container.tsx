import React from 'react';
import qs from 'qs';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
	PaginationEllipsis,
} from 'components/ui/pagination';
import { TSearchParams } from 'app/shop/page';

const PAGINATION_DISPLAYED_LIMIT = 4;
const MIDDLE_INDEX = Math.floor(PAGINATION_DISPLAYED_LIMIT / 2);

export function PaginationContainer({
	lastPage,
	currentPage,
	searchParams,
}: {
	searchParams: TSearchParams;
	currentPage: number;
	lastPage: number;
}) {
	const offset =
		+searchParams.page >= MIDDLE_INDEX ? +searchParams.page - MIDDLE_INDEX : 0;

	const sp = new URLSearchParams(searchParams);

	const setPage = (value: string | number) => {
		if (value === 1) {
			sp.delete('page');
		} else {
			sp.set('page', String(value));
		}
		return `?${sp.toString()}`;
	};

	return (
		<Pagination className='py-8'>
			<PaginationContent>
				{currentPage !== 1 && (
					<PaginationItem>
						<PaginationPrevious href={setPage(currentPage - 1)} />
					</PaginationItem>
				)}
				{Array.from({
					length: Math.min(lastPage, PAGINATION_DISPLAYED_LIMIT + offset),
				})
					.map((_, i) => {
						const pageNumber = i + 1;
						return (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									isActive={currentPage === pageNumber}
									href={setPage(pageNumber)}>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						);
					})
					.slice(0 + offset, PAGINATION_DISPLAYED_LIMIT + offset)}

				{currentPage !== lastPage && (
					<PaginationItem>
						<PaginationNext href={setPage(currentPage + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
