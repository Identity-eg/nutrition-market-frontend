import { getCart } from 'apis/server/cart';

export default async function HomePage() {
	const data = await getCart();

	return (
		<main className="">
			Home page
			<br />
			{data.err}
		</main>
	);
}
