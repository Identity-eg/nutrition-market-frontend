'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircleIcon, SearchIcon, XIcon } from 'lucide-react';

import { getProducts } from 'apis/server/products';

import { Input } from 'components/ui/input';
import { Separator } from 'components/ui/separator';
import { SearchList } from 'components/layout/header/search/search-list';
import { Overlay } from 'components/layout/header/search/overlay';
import { useGetBodyHeight } from 'components/layout/header/search/use-get-body-height';

import { useOutsideClick } from 'lib/use-outside-click';
import { cn } from 'lib/utils';
import useDebounce from 'lib/use-debounce';
import { usePathname, useSearchParams } from 'next/navigation';

export function Searchbar() {
	const [isSearchListOpen, setIsSearchListOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const pathname = usePathname();
	const searchParam = useSearchParams();

	const bodyHeight = useGetBodyHeight({ enabled: isSearchListOpen });

	const ref = useOutsideClick(
		() => setIsSearchListOpen(false),
		isSearchListOpen
	);

	const debouncedValue = useDebounce(searchValue, 700);

	const closeSearchList = () => {
		setIsSearchListOpen(false);
	};

	const resetInput = () => {
		setSearchValue('');
	};

	useEffect(() => {
		if (!setIsSearchListOpen) return;
		closeSearchList();
		resetInput();
	}, [pathname, searchParam]);

	const { data, isPlaceholderData, isFetching } = useQuery({
		queryKey: ['products', debouncedValue],
		queryFn: () => getProducts({ name: debouncedValue }),
		enabled: !!debouncedValue,
		placeholderData: previousData => previousData,
	});

	return (
		<div className='relative w-1/2 p-8'>
			<div
				style={{ height: isSearchListOpen ? `${bodyHeight - 60}px` : 0 }}
				className={cn(
					'invisible absolute inset-0 [&>*]:visible',
					isSearchListOpen && 'visible'
				)}>
				<div
					ref={ref}
					className={cn(
						'absolute inset-x-0 z-20 rounded-md bg-white p-2',
						isSearchListOpen && 'sticky top-4'
					)}>
					<div className='relative'>
						<Input
							onChange={e => setSearchValue(e.target.value)}
							onFocus={() => setIsSearchListOpen(true)}
							value={searchValue}
							className='rounded-full bg-gray-30'
							placeholder='Explore vitamins, supplements, ...etc'
						/>
						<div className='absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-2 text-green-500'>
							<div
								className={cn(
									'hidden scale-0 items-center gap-2 transition-all behavior-discrete',
									!!searchValue && 'flex scale-100 starting:scale-0'
								)}>
								{isFetching ? (
									<LoaderCircleIcon
										size={20}
										className='animate-spin'
									/>
								) : (
									<XIcon
										onClick={resetInput}
										size={20}
									/>
								)}
								<Separator
									orientation='vertical'
									className='h-6 w-[1px]'
								/>
							</div>
							<SearchIcon size={20} />
						</div>
					</div>

					{isSearchListOpen && (
						<SearchList
							isPlaceholderData={isPlaceholderData}
							searchValue={searchValue}
							debouncedValue={debouncedValue}
							products={data?.products}
						/>
					)}
				</div>
			</div>
			<Overlay isSearchListOpen={isSearchListOpen} />
		</div>
	);
}
