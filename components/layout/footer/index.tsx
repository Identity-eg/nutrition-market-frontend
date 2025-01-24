import { Headset } from 'lucide-react';

export function Footer() {
	const myAccount = [
		// "Product Support",
		'Checkout',
		'Shopping Cart',
		// "Wishlist",
		// "Terms & Conditions",
		// "Redeem Voucher",
	];
	const quickLinks = ['Store Location', 'My account', 'Order Tracking', 'FAQs'];

	const customerCare = [
		'New Customers',
		'How to use Account',
		'Placing an Order',
		'Payment Methods',
		'Delivery & Dispatch',
		'Problems with Order',
	];
	return (
		<footer className='mt-auto bg-[#344e41] py-12'>
			<div className='container text-white'>
				<div className='mb-4 grid grid-cols-2 gap-x-4 gap-y-10 border-b border-green-400 pb-8 text-sm media-md:grid-cols-4'>
					<div className='flex flex-col gap-4 media-md:gap-6'>
						<h2 className='text-[#a3b18a] typography-M16'>Let&apos;s Talk</h2>
						<div>
							<div className='mb-2 flex items-center gap-2'>
								<Headset
									size={48}
									className='text-[#dda15e]'
								/>
								<div>
									<h3>Phone number</h3>
									<h2 className='font-semibold text-[#dda15e] media-md:text-lg'>
										+02 0111 598 2393
									</h2>
								</div>
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-4 media-md:gap-6'>
						<h2 className='text-[#a3b18a] typography-M16'>My Account</h2>
						<ul className='flex flex-col gap-2'>
							{myAccount.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all duration-200 hover:translate-x-2 hover:text-[#dda15e]'>
									<a>{item}</a>
								</li>
							))}
						</ul>
					</div>
					<div className='flex flex-col gap-4 media-md:gap-6'>
						<h2 className='text-[#a3b18a] typography-M16'>My Quick Links</h2>
						<ul className='flex flex-col gap-2'>
							{quickLinks.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all hover:translate-x-2 hover:text-[#dda15e]'>
									<a>{item}</a>
								</li>
							))}
						</ul>
					</div>
					<div className='flex flex-col gap-4 media-md:gap-6'>
						<h2 className='text-[#a3b18a] typography-M16'>My Customer Care</h2>
						<ul className='flex flex-col gap-2'>
							{customerCare.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all hover:translate-x-2 hover:text-[#dda15e]'>
									<a>{item}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<p className='typography-R14'>
					All Rights Reserved <span className='text-[#a3b18a]'>IDENT</span>.
				</p>
				<p className='typography-R14'>
					Developed By{' '}
					<span className='text-[#a3b18a]'>Amr Tawfik & hady Tawfik</span>.
				</p>
			</div>
		</footer>
	);
}
