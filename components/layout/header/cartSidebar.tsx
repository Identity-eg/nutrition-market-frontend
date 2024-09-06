import Image from 'next/image';
import Link from 'next/link';

import { Button } from 'components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import CartSideItem from './cartItem';

import { CartBtn } from './cart-btn';
import { getCart } from 'apis/server/cart';
import { Separator } from 'components/ui/separator';
import noCartFound from 'assets/no-cart-found.svg';
import Price from 'app/shop/components/card-item/price';

export async function CartSidebar() {
	const cart = await getCart();
	const isCartEmpty = cart.items.length === 0;
	return (
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<CartBtn />
			</SheetTrigger>

			<SheetContent className='flex flex-col'>
				<SheetHeader>
					<SheetTitle>Shopping Cart</SheetTitle>
				</SheetHeader>

				{isCartEmpty ? (
					<div className='mt-8 flex flex-col items-center justify-center gap-y-4'>
						<Image
							src={noCartFound}
							className='w-1/5'
							alt='No products found in cart'
							width={500}
							height={500}
						/>
						<h1 className='text-center text-gray-800'>Your cart is empty</h1>
					</div>
				) : (
					<>
						<ul className='relative flex-1 divide-y divide-gray-50 overflow-y-auto'>
							{cart?.items?.map(item => {
								return (
									<CartSideItem
										key={item._id}
										{...item}
									/>
								);
							})}
						</ul>

						<Separator />

						<SheetFooter className='mt-auto flex-col space-y-4'>
							<div className='flex justify-between gap-2 text-base font-medium text-gray-900'>
								<div>
									<p>Subtotal</p>
									<p className='mt-0.5 text-gray-300 typography-R14'>
										Shipping and taxes calculated at checkout.
									</p>
								</div>
								<Price
									finalPriceClassName='typography-B18'
									price={cart.totalPrice}
								/>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<SheetClose asChild>
									<Button asChild>
										<Link href='/checkout'>Checkout</Link>
									</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button
										variant='outline'
										asChild>
										<Link href='/cart'>View Cart</Link>
									</Button>
								</SheetClose>
							</div>
							<div className='flex justify-center text-center text-sm text-gray-500'>
								<p>
									or{' '}
									<SheetClose asChild>
										<Link
											href='/shop'
											className='text-neutral-800 hover:text-neutral-700 font-medium'>
											Continue Shopping
											<span aria-hidden='true'> &rarr;</span>
										</Link>
									</SheetClose>
								</p>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
