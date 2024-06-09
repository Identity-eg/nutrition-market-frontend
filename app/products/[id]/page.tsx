import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import vitaminD3Image from '@/app/assets/vitamin-d3.png';

export default function ProductPage() {
    return (
        <div className="grid grid-cols-2">
            <div className="flex items-center justify-center border-r border-black/15 p-[32px]">
                <div>
                    <Image width={220} alt="Product image" src={vitaminD3Image} />
                </div>
            </div>
            <div className="p-[32px]">
                <div className="mb-8 border-b border-black/15 pb-[12px]">
                    <h2 className="mb-[4px] typography-SB24">Vitapolygon - omega 3</h2>
                    <div className="mb-[24px] flex items-center gap-[8px] text-black/50 typography-R14">
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
                            <button className="rounded-md border border-blue-500 px-[16px] py-[8px] text-blue-500">
                                60 Caps
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-md border border-black/15 px-[16px] py-[8px]">
                                30 Caps
                                <div className="rounded-full bg-[red] px-[8px] text-white typography-M14">
                                    Save 80 EGP
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2">Concentration</h4>
                        <div className="flex items-center gap-[8px]">
                            <button className="rounded-md border border-blue-500 px-[16px] py-[8px] text-blue-500">
                                4000 IU
                            </button>
                            <button className="rounded-md border border-black/15 px-[16px] py-[8px]">6000 IU</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
