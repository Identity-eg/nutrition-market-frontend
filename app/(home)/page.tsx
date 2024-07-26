import Hero from './hero';

export default async function HomePage() {
	return (
		<section>
			<Hero />
			<div className="bg-primary">
				<div className="py-6 text-center bg-green-500 sm:py-6">
					<h3 className="font-normal text-white">
						Start Your Heath Recovery Vacation{' '}
						<span className="font-bold">Now</span>
					</h3>
				</div>
			</div>
		</section>
	);
}
