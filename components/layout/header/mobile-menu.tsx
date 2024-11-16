import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { navLinks } from 'constants/navLinks';

function MobileNavLink({ link }) {
	return (
		<Accordion
			key={link.label}
			type='single'
			collapsible>
			<AccordionItem
				className='border-0'
				value='item-1'>
				<li>
					<AccordionTrigger>
						<SheetClose asChild>
							<Link href={link.to}>{link.label}</Link>
						</SheetClose>
					</AccordionTrigger>

					<ul>
						{link?.children?.map(l => (
							<AccordionContent
								key={l.label}
								asChild>
								<MobileNavLink
									key={l.label}
									link={l}
								/>
							</AccordionContent>
						))}
					</ul>
				</li>
			</AccordionItem>
		</Accordion>
	);
}

export function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<MenuIcon className='text-green-500' />
			</SheetTrigger>

			<SheetContent className='flex w-full flex-col'>
				<SheetHeader className='border-b border-gray-50 pb-4'>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<ul>
					{navLinks.map(link => {
						return (
							<MobileNavLink
								key={link.label}
								link={link}
							/>
						);
						// if (!link.children) {
						// 	return (
						// 		<li key={link.label}>
						// 			<SheetClose asChild>
						// 				<Link href={link.path}>{link.label}</Link>
						// 			</SheetClose>
						// 		</li>
						// 	);
						// } else {
						// 	return (
						// 		<AccordionItem
						// 			className='border-0'
						// 			value='item-1'>
						// 			<AccordionTrigger>{link.label}</AccordionTrigger>
						// 			<AccordionContent asChild>
						// 				<ul>
						// 					{link.children.map(l => (
						// 						<li key={l.label}>
						// 							<SheetClose asChild>
						// 								<Link href={l.to}>{l.label}</Link>
						// 							</SheetClose>
						// 						</li>
						// 					))}
						// 				</ul>
						// 			</AccordionContent>
						// 		</AccordionItem>
						// 	);
						// }
					})}
				</ul>

				<SheetFooter className='mt-auto flex-col space-y-4'>
					<div className='flex justify-between gap-2 text-base font-medium text-gray-900'></div>

					<div className='grid grid-cols-2 gap-4'>
						<SheetClose asChild></SheetClose>
						<SheetClose asChild></SheetClose>
					</div>
					<div className='flex justify-center text-center text-sm text-gray-500'>
						<p></p>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
