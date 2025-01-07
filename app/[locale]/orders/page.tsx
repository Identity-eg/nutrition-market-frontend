import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import dayjs from 'dayjs';

import { getAllOrders } from 'features/orders/apis/orders';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { ORDER_STATUS } from 'constants/index';
import { cn, convertToReadableNumber } from 'lib/utils';
import type { TOrderItem } from 'features/orders/types/order';
import { Price } from 'components/utils/price';

export const metadata: Metadata = {
	title: 'Orders',
};
function OrderItem({
	amount,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
}: TOrderItem) {
	return (
		<li className='flex w-full gap-4'>
			<div className='relative size-20 flex-shrink-0 rounded-md bg-gray-30'>
				<Image
					src={variant.images[0].url}
					width={64}
					height={64}
					alt={variant.name}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div className='absolute right-0 top-0 flex size-[18px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-50 py-2 typography-M12'>
					{amount}
				</div>
			</div>

			<div className='flex w-full flex-col text-gray-400 typography-M16'>
				<h4 className='line-clamp-2'>{variant.name}</h4>
				<div className='flex h-full justify-between'>
					<span className='mt-2 typography-R14'>{variant.unitCount} Caps</span>
					<Price
						className='mb-0 ms-auto'
						finalPriceClassName='typography-M14 text-gray-400'
						price={Number(totalProductPriceAfterCoupon ?? totalProductPrice)}
					/>
				</div>
			</div>
		</li>
	);
}

export default async function Orders() {
	const orders = await getAllOrders();
	const ordersNumber = orders.length;

	return (
		<div className='container flex min-h-screen flex-col py-14'>
			<h3 className='mb-6 flex items-center gap-2 typography-M20'>
				My order {'   '}
				<div className='flex size-6 items-center justify-center rounded-md bg-gray-30 typography-M16'>
					<span>{ordersNumber}</span>
				</div>
			</h3>
			{orders.map(order => {
				const formattedCreatedAtDate = dayjs(order.createdAt).format(
					'MMMM D, YYYY'
				);
				const orderDetails = {
					orderDate: { label: 'Order date', text: formattedCreatedAtDate },
					totalPrice: {
						label: 'Total price',
						text: `${convertToReadableNumber(order.total)} EGP`,
					},
				};

				return (
					<Card
						key={order._id}
						className='relative mb-8 max-w-[800px] overflow-hidden'>
						<div className='flex items-center justify-between p-4'>
							<div className='flex flex-col'>
								<span className='text-gray-200 typography-R14'>Order Id</span>
								<span className='typography-M18'>#{order._id}</span>
							</div>
							<div
								className={cn(
									'max-w-fit rounded-md px-2 py-1 capitalize text-white typography-R13',
									{
										'border border-orange-100 bg-orange-50 text-orange-500':
											order.status === ORDER_STATUS.processing,
										'border border-green-light-200 bg-green-light-50 text-green-light-600':
											order.status === ORDER_STATUS.delivered,
										'bg-[#1640d60f] text-[#1640D6]':
											order.status === ORDER_STATUS.shipped,
										'border border-red-100 bg-red-50 text-red-500':
											order.status === ORDER_STATUS.cancelled,
									}
								)}>
								{order.status}
							</div>
						</div>

						{/* <div className='relative p-4'> */}
						<ul className='grid max-h-[250px] grid-cols-2 items-center gap-8 overflow-y-auto p-4'>
							{order.orderItems.map(item => (
								<OrderItem
									key={item._id}
									{...item}
								/>
							))}
						</ul>
						{/* {isOrdersItemExceedLimit && (
								<div className='absolute inset-x-0 bottom-0 h-[150px] w-full bg-gradient-to-t from-white to-[rgba(255,255,255,0)]' />
							)} */}
						{/* </div> */}
						<div className='flex items-center gap-6 border-t border-gray-40 bg-gray-20 p-4'>
							{Object.entries(orderDetails).map(([key, value]) => {
								return (
									<p
										key={key}
										className='flex flex-col'>
										<span className='capitalize text-gray-200 typography-R14'>
											{value.label}
										</span>
										{value.text}
									</p>
								);
							})}
							<div className='ms-auto flex gap-2'>
								<Button
									variant={
										order.status === ORDER_STATUS.delivered
											? 'outline'
											: 'primary'
									}>
									<Link href={`orders/${order._id}`}>
										{order.status === ORDER_STATUS.delivered
											? 'Order details'
											: 'Track order'}
									</Link>
								</Button>
								{order.status === ORDER_STATUS.delivered && (
									<Button>Reorder</Button>
								)}
							</div>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
