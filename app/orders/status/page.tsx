import { MoveLeftIcon, TruckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import createOrderPng from 'assets/createOrder.png';

import { Button } from 'components/ui/button';
import { CopyBtn } from 'components/utils/copy-btn';

export default async function OrderStatus(props: {
	searchParams: Promise<{ orderId: string }>;
}) {
	const searchParams = await props.searchParams;
	// const encpl = cookies()?.get('encpl')?.value;
	// const values = JSON.parse(encpl ?? '{}');
	// if (!encpl) {
	// 	redirect('/');
	// }
	return (
		<div className='container flex flex-col items-center justify-center py-24'>
			<Image
				className='mb-4'
				src={createOrderPng}
				alt='Your order created successfully'
			/>
			<h2 className='mb-2 text-green-800 typography-SB24 media-md:typography-SB36'>
				Thanks for your order!
			</h2>
			<p className='mb-10 max-w-[50ch] text-center text-gray-300'>
				Your order will be sent to your address via the selected delivery
				service after confirmation by the most branch. You can track your order
				by order ID.
			</p>
			<div className='mb-6 flex items-center gap-6'>
				<span className='text-gray-300'>Your order ID</span>
				<span className='flex max-w-[150px] items-center gap-2 rounded-md border border-gray-50 bg-gray-20 px-2 py-1 text-green-light-700'>
					{`#${searchParams.orderId.slice(0, 8)}...`}
					<CopyBtn copyText={searchParams.orderId} />
				</span>
			</div>
			<div className='flex gap-2 media-md:gap-4'>
				<Button
					className='gap-2'
					variant='outline'
					asChild>
					<Link href='/'>
						<MoveLeftIcon size={20} />
						Back to main page
					</Link>
				</Button>
				<Button
					className='gap-2'
					asChild>
					<Link href={`/orders/${searchParams.orderId}`}>
						<TruckIcon size={20} />
						Track your order
					</Link>
				</Button>
			</div>
		</div>
	);
}
