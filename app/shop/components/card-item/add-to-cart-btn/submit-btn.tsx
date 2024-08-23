import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Check, Circle } from 'lucide-react';
import { Button } from 'components/ui/button';

export function SubmitBtn({
	state,
}: {
	state:
		| {
				msg: string;
				cartId?: string;
		  }
		| {
				err: string;
		  }
		| undefined;
}) {
	const { pending } = useFormStatus();

	const [isAddedEnd, setIsAddedEnd] = useState(false);
	useEffect(() => {
		setIsAddedEnd(false);
		if (state) {
			const id = setTimeout(() => setIsAddedEnd(true), 1000);

			return () => {
				clearTimeout(id);
			};
		}
	}, [state]);

	return (
		<Button
			type='submit'
			disabled={pending}
			className='relative flex w-full flex-1 items-center justify-center capitalize'>
			{pending ? (
				<Circle
					size={10}
					fill='white'
					className='animate-bounced'
				/>
			) : state && !isAddedEnd ? (
				<>
					<Check
						size={20}
						className='absolute'
					/>
				</>
			) : (
				<span>add to cart</span>
			)}
		</Button>
	);
}
