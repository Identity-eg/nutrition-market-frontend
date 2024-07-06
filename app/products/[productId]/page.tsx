import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';
// import vitaminD3Image from '@/app/assets/vitamin-d3.png';
// import { Button } from '@/app/ui/components/button';

export default function ProductPage() {
	return (
		<div className="grid grid-cols-2">
			<div className="border-gray-2 flex items-center justify-center border-r p-[32px]">
				<div>
					{/* <Image width={220} alt="Product image" src={vitaminD3Image} /> */}
				</div>
			</div>
			<div className="p-[32px]">
				<div className="border-gray-2 mb-8 border-b pb-[12px]">
					<h2 className="mb-[4px] typography-SB24">Vitapolygon - omega 3</h2>
					<div className="text-gray-6 mb-[24px] flex items-center gap-[8px] typography-R14">
						<span>1 reviews</span>
						<Link href="#">write a review</Link>
					</div>
					<div className="text-blue-500 typography-SB24">
						350 <span className="typography-R14">EGP</span>
					</div>
				</div>
				<div>
					<div className="mb-[20px]">
						<h4 className="mb-2">Count</h4>
						<div className="flex items-center gap-[8px]">
							<Button variant="outline-blue">60 Caps</Button>
							<Button variant="outline-gray">
								30 Caps
								<div>Save 80 EGP</div>
							</Button>
						</div>
					</div>
					<div>
						<h4 className="mb-2">Concentration</h4>
						<div className="flex items-center gap-[8px]">
							<Button variant="outline-blue">4000 IU</Button>
							<Button variant="outline-gray">6000 IU</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

