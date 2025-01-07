import Link from 'next/link';
import NotFoundIcon from 'assets/icons/not-found';
import { Button } from 'components/ui/button';

export default function NotFoundPage() {
	return (
		<div className='container flex min-h-[calc(100vh-150px)] flex-col items-center justify-center'>
			<NotFoundIcon />
			<span className='mb-2 mt-8 text-black typography-SB24'>
				Page Not Found
			</span>
			<p className='mb-4 max-w-[40ch] text-center text-gray-200'>
				It looks like nothing was found at this location. Maybe try to search
				for what you are looking for?
			</p>
			<Button asChild>
				<Link href='/'>Go to home</Link>
			</Button>
		</div>
	);
}
