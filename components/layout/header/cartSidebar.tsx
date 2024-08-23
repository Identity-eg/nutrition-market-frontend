import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, ShoppingCartIcon } from 'lucide-react';
// UI
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
// Utils
import { CartBtn } from './cart-btn';
import { getCart } from 'apis/server/cart';
import { Separator } from 'components/ui/separator';

export async function CartSidebar() {
	const cart = await getCart();
	return (
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<CartBtn />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='capitalize'>shopping cart</SheetTitle>
				</SheetHeader>
				{'err' in cart ? (
					<div className='flex flex-col items-center justify-center mt-8 gap-y-8'>
						<Image
							src='noCartFound.svg'
							className='w-1/5'
							alt='No products found in cart'
							width={500}
							height={500}
						/>
						<h1 className='text-center text-gray-800'>
							No products found in your cart
						</h1>
					</div>
				) : (
					<div className='grid h-[calc(100vh-160px)] grid-rows-[1fr,auto,auto] gap-4'>
						<ul className='divide-y divide-gray-50'>
							{cart?.items?.map(item => {
								console.log({ item });
								return (
									<CartSideItem
										key={item._id}    
										{...item}
									/>
								);
							})}
						</ul>

						<Separator />

						{/* Footer */}
						<SheetFooter>
							<div className='flex flex-col gap-6'>
								<div className='flex justify-between gap-2 text-base font-medium text-gray-900'>
									<div>
										<p>Subtotal</p>
										<p className='mt-0.5 text-gray-300 typography-R14'>
											Shipping and taxes calculated at checkout.
										</p>
									</div>
									{/* <FormatNumber value={cart.totalPrice} /> */}
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
								<div className='flex justify-center text-sm text-center text-gray-500'>
									<p>
										or{' '}
										<SheetClose asChild>
											<Link
												href='/products'
												className='font-medium text-neutral-800 hover:text-neutral-700'>
												Continue Shopping
												<span aria-hidden='true'> &rarr;</span>
											</Link>
										</SheetClose>
									</p>
								</div>
							</div>
						</SheetFooter>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
