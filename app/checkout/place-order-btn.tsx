import { pay } from 'apis/server/payment';
import { Button } from 'components/ui/button';
import { useToast } from 'components/ui/use-toast';
import { Loader2Icon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

export function PlaceOrderBtn({
	paymentMethodId,
	addressId,
	cartId,
}: {
	paymentMethodId: string;
	addressId: string;
	cartId: string;
}) {
	const { toast } = useToast();
	const { execute, isPending } = useAction(pay, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
		onSuccess: ({ data }) => {
			window.location.assign(
				`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PK}&clientSecret=${data?.clientSecret}`
			);
		},
	});

	return (
		<Button
			disabled={isPending}
			onClick={() => {
				execute({ addressId, cartId, paymentMethodId });
			}}
			className='rounded-md py-3 text-center'>
			{isPending ? (
				<>
					<Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
					Please wait
				</>
			) : (
				'Place order'
			)}
		</Button>
	);
}
