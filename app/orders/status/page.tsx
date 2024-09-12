import { Button } from 'components/ui/button';
import { MoveLeftIcon, TruckIcon } from 'lucide-react';
import Link from 'next/link';
import createOrderPng from 'assets/createOrder.png';
import Image from 'next/image';
import { CopyBtn } from './copy-btn';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function OrderStatus() {
	const encpl = cookies()?.get('encpl')?.value;
	const values = JSON.parse(encpl ?? '{}');
	if (!encpl) {
		redirect('/');
	}
	return (
		<div className='container flex flex-col items-center justify-center py-24'>
			<Image
				className='mb-4'
				src={createOrderPng}
				alt='Your order created successfully'
			/>
			<h2 className='mb-2 text-green-800 typography-SB36'>
				Thanks for your order!
			</h2>
			<p className='mb-10 w-[50ch] text-center text-gray-300'>
				Your order will be sent to your address via the selected delivery
				service after confirmation by the most branch. You can track your order
				by order ID.
			</p>
			<div className='mb-6 flex items-center gap-6'>
				<span className='text-gray-300'>Your order ID</span>
				<CopyBtn orderId={values.orderId} />
			</div>
			<div className='flex gap-4'>
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
					<Link href='/orders'>
						<TruckIcon size={20} />
						Track your order
					</Link>
				</Button>
			</div>
		</div>
	);
}
