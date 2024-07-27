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
import { useGetCart } from 'apis/cart';

export function CartSidebar() {
	// const cartQuery = useGetCart();
	return (
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<div className='relative'>
					<ShoppingBasket />
					<span className='absolute -top-3/4 right-1/2 flex size-[18px] translate-x-1/2 items-center justify-center rounded-full bg-[#dda15e] text-white typography-M12'>
						2
					</span>
				</div>
				<div className='flex flex-col items-start typography-M14'>
					<p className='text-black'>Cart</p>
					<p className='text-[#bc6c25]'>299 EGP</p>
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='capitalize'>shopping cart</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				{true ? (
					<div className='mt-8 flex flex-col items-center justify-center gap-y-8'>
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
						<ul className='divide-y divide-gray-200 overflow-y-auto'>
							{/* {cartQuery.data.items?.map(item => (
								<CartSideItem
									key={item._id}
									{...item}
								/>
							))} */}
						</ul>

						<hr />

						{/* Footer */}
						<SheetFooter>
							<div className='flex flex-col gap-6'>
								<div className='flex justify-between gap-2 text-base font-medium text-gray-900'>
									<div>
										<p>Subtotal</p>
										<p className='mt-0.5 text-sm text-gray-500'>
											Shipping and taxes calculated at checkout.
										</p>
									</div>
									{/* <FormatNumber value={cart.totalPrice} /> */}
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<SheetClose asChild>
										<Button
											variant='destructive'
											asChild>
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
										or
										<SheetClose asChild>
											<Link
												href='/products'
												className='text-neutral-800 hover:text-neutral-700 font-medium'>
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
