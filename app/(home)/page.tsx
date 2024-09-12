import Hero from './hero';

export default async function HomePage() {
	return (
		<section>
			<Hero />
			<div className='bg-primary'>
				<div className='sm:py-6 bg-green-500 py-6 text-center'>
					<h3 className='font-normal text-white'>
						Start Your Heath Recovery Vacation{' '}
						<span className='font-bold'>Now</span>
					</h3>
				</div>
			</div>
		</section>
	);
}
