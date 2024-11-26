import { cn } from 'lib/utils';

export default function CouponBanner({
	sale,
	companyName,
	className,
}: {
	sale: number;
	companyName: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'flex gap-2 rounded-md border border-green-light-200 bg-green-light-50 p-2 text-green-light-700 typography-M13',
				className
			)}>
			<p>
				You have got <span className='typography-B14'>{sale}%</span> discount on
				all products from <span className='typography-B14'>{companyName}</span>{' '}
				in your cart!
			</p>
		</div>
	);
}
