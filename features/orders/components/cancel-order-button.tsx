'use client';

import { Button } from 'components/ui/button';
import { FrownIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { cancelOrder } from 'features/orders/api/orders';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'components/ui/dialog';

import { useState } from 'react';
import { toast } from 'components/ui/use-toast';

export function CancelOrderButton({ orderId }: { orderId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [cancelReason, setCancelReason] = useState('');
	const [error, setError] = useState('');

	const { execute, isPending, result } = useAction(cancelOrder, {
		onSuccess: async () => {
			setIsOpen(false);
		},
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className='mt-auto flex w-full items-center gap-1 border border-orange-300 bg-orange-40 text-orange-600 hover:bg-orange-300 hover:text-white'>
					<XIcon size={20} />
					Cancel order
				</Button>
			</DialogTrigger>
			<DialogContent className='media-sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<FrownIcon />
						We're Sorry to See You Go!
					</DialogTitle>
					<DialogDescription className='flex flex-col'>
						<span className='mt-4 inline-block typography-M16'>
							Before you proceed, we’d love to understand your reasons?
						</span>
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-2'>
					{[
						{ reason: 'I found a better price elsewhere' },
						{ reason: 'The item is no longer needed' },
						{ reason: 'I experienced issues during checkout.' },
						{ reason: 'I changed my mind about the purchase' },
						{ reason: 'Other reason' },
					].map(el => (
						<Button
							type='button'
							onClick={() => {
								setError('');
								setCancelReason(el.reason);
							}}
							key={el.reason}
							variant={cancelReason === el.reason ? 'ghost-green' : 'outline'}
							className='shadow-none'>
							{el.reason}
						</Button>
					))}
					{error && (
						<span className='text-red-500 typography-R14'>{error}</span>
					)}
				</div>

				<DialogFooter>
					<Button
						onClick={() => {
							if (!cancelReason) {
								setError('Please provide reason');
								return;
							}
							execute({ cancelReason, orderId });
						}}
						type='submit'
						disabled={isPending}>
						{isPending ? (
							<>
								<Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
								Please wait
							</>
						) : (
							'Cancel order'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
