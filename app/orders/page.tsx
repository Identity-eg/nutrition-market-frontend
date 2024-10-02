import { getAllOrders } from 'apis/server/orders';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { ORDER_STATUS } from 'constants/index';
import dayjs from 'dayjs';
import { cn, convertToReadableNumber } from 'lib/utils';
import { PillIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TOrderItem } from 'types/order';

function OrderItem({ amount, totalProductPrice, variant }: TOrderItem) {
	return (
		<li className='flex w-full gap-4 border-b border-gray-40 pb-4 pt-4 first:pt-0 last:border-0 last:pb-0'>
			<div className='relative size-20 flex-shrink-0 rounded-md border border-gray-40'>
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

			<div className='flex w-full flex-col justify-between text-gray-400 typography-M16'>
				<div className='line-clamp-2'>
					{variant.name}
					<span className='flex max-w-fit items-center justify-start gap-2 typography-R14'>
						{variant.unitCount} Caps
					</span>
				</div>
				<span className='self-end'>
					{convertToReadableNumber(+totalProductPrice)} EGP
				</span>
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
			{orders.slice(0, 3).map(order => {
				const isOrdersItemExceedLimit = order.orderItems.length > 3;
				const formattedCreatedAtDate = dayjs(order.createdAt).format(
					'MMMM D, YYYY'
				);
				const orderDetails = {
					'order date': { text: formattedCreatedAtDate },
					'total price': {
						text: `${convertToReadableNumber(order.total)} EGP`,
					},
				};

				return (
					<Card
						key={order._id}
						className='relative mb-4 max-w-[800px] overflow-hidden'>
						<div
							className={cn(
								'max-w-fit rounded-md rounded-l-none rounded-tr-none px-3 py-1 capitalize text-white typography-R14',
								{
									'bg-orange-500': order.status === ORDER_STATUS.processing,
									'bg-green-light-600': order.status === ORDER_STATUS.delivered,
									'bg-[#1640D6]': order.status === ORDER_STATUS.shipped,
									'bg-red-500': order.status === ORDER_STATUS.canceled,
								}
							)}>
							{order.status}
						</div>
						<div className='relative p-4'>
							<ul>
								{order.orderItems.map(item => (
									<OrderItem
										key={item._id}
										{...item}
									/>
								))}
							</ul>
							{isOrdersItemExceedLimit && (
								<div className='absolute inset-x-0 bottom-0 h-[150px] w-full bg-gradient-to-t from-white to-[rgba(255,255,255,0)]' />
							)}
						</div>
						<div className='flex items-center gap-6 border-t border-gray-40 bg-gray-20 p-4'>
							{Object.entries(orderDetails).map(([key, value]) => {
								return (
									<p
										key={key}
										className='flex flex-col'>
										<span className='capitalize text-gray-200 typography-R14'>
											{key}
										</span>
										{value.text}
									</p>
								);
							})}
							<div className='ml-auto flex gap-2'>
								<Button
									variant={
										order.status === ORDER_STATUS.delivered
											? 'secondary-gray'
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
