import { getAllOrders } from 'apis/server/orders';
import Link from 'next/link';

export default async function Orders() {
	const orders = await getAllOrders();
	console.log({ orders });
	return (
		<div className='container flex min-h-screen flex-col py-24'>
			{orders.map(order => (
				<Link
					href={`orders/${order._id}`}
					className='hover:underline'>
					order Id: {order._id}
				</Link>
			))}
		</div>
	);
}
